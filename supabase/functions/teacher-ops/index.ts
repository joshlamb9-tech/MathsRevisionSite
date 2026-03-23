import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: cors });
  }

  let body: { password?: unknown; action?: unknown; uuid?: unknown; name?: unknown; confirm?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  // Verify teacher password
  const teacherPassword = Deno.env.get('TEACHER_PASSWORD') ?? '';
  if (!teacherPassword || body.password !== teacherPassword) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), { status: 401, headers: cors });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // ── LIST PUPILS WITH STATS ────────────────────────────────────────────────
  if (body.action === 'list_pupils') {
    const { data: pupils, error: pe } = await supabase
      .from('pupils')
      .select('id, name, created_at')
      .order('name');

    if (pe) {
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
    }

    // Fetch all scores (no per-page limit — teacher view)
    const { data: scores, error: se } = await supabase
      .from('ma_scores')
      .select('pupil_uuid, score, total, percentage, time_seconds, created_at, topic_breakdown')
      .not('pupil_uuid', 'is', null)
      .order('created_at', { ascending: true });

    if (se) {
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
    }

    // Group scores by pupil UUID
    const scoresByPupil: Record<string, typeof scores> = {};
    for (const s of (scores ?? [])) {
      if (!scoresByPupil[s.pupil_uuid]) scoresByPupil[s.pupil_uuid] = [];
      scoresByPupil[s.pupil_uuid].push(s);
    }

    // Build per-pupil stats
    const result = (pupils ?? []).map((p) => {
      const ps = scoresByPupil[p.id] ?? [];
      const attempts = ps.length;

      const pcts = ps
        .map(s => s.percentage != null ? parseFloat(s.percentage) : (s.score / s.total) * 100)
        .filter(n => !isNaN(n));

      const avgPct  = pcts.length ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : null;
      const bestPct = pcts.length ? Math.round(Math.max(...pcts)) : null;
      const lastSeen = ps.length ? ps[ps.length - 1].created_at : null;

      // Aggregate topic breakdown across all sessions
      const topicTotals: Record<string, { correct: number; total: number }> = {};
      for (const s of ps) {
        if (!s.topic_breakdown) continue;
        for (const [topic, stats] of Object.entries(s.topic_breakdown as Record<string, { correct: number; total: number }>)) {
          if (!topicTotals[topic]) topicTotals[topic] = { correct: 0, total: 0 };
          topicTotals[topic].correct += stats.correct;
          topicTotals[topic].total   += stats.total;
        }
      }

      // Recent score trend (last 5 attempts)
      const recent = ps.slice(-5).map(s =>
        s.percentage != null ? parseFloat(s.percentage) : (s.score / s.total) * 100
      );

      return {
        id: p.id,
        name: p.name,
        created_at: p.created_at,
        attempts,
        avg_pct: avgPct,
        best_pct: bestPct,
        last_seen: lastSeen,
        recent_scores: recent,
        topic_breakdown: topicTotals,
      };
    });

    return new Response(JSON.stringify({ pupils: result }), { headers: cors });
  }

  // ── RENAME PUPIL ──────────────────────────────────────────────────────────
  if (body.action === 'rename_pupil') {
    const { uuid, name } = body;

    if (typeof uuid !== 'string' || !UUID_RE.test(uuid)) {
      return new Response(JSON.stringify({ error: 'Invalid uuid' }), { status: 400, headers: cors });
    }
    if (typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), { status: 400, headers: cors });
    }

    const { error } = await supabase
      .from('pupils')
      .update({ name: name.trim() })
      .eq('id', uuid);

    if (error) {
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
    }

    return new Response(JSON.stringify({ success: true }), { headers: cors });
  }

  // ── DELETE PUPIL ──────────────────────────────────────────────────────────
  if (body.action === 'delete_pupil') {
    const { uuid } = body;

    if (typeof uuid !== 'string' || !UUID_RE.test(uuid)) {
      return new Response(JSON.stringify({ error: 'Invalid uuid' }), { status: 400, headers: cors });
    }

    // Delete scores first (no ON DELETE CASCADE on the FK)
    const { error: se } = await supabase
      .from('ma_scores')
      .delete()
      .eq('pupil_uuid', uuid);

    if (se) {
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
    }

    const { error: pe } = await supabase
      .from('pupils')
      .delete()
      .eq('id', uuid);

    if (pe) {
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
    }

    return new Response(JSON.stringify({ success: true }), { headers: cors });
  }

  return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: cors });
});
