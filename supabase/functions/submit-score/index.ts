import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const MIN_SECONDS_PER_Q = 4;  // below this per question = impossible
const VALID_TOTALS = [10, 15, 30, 40];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: cors });
  }

  let body: { initials?: unknown; score?: unknown; total?: unknown; time_seconds?: unknown; pupil_uuid?: unknown; topic_breakdown?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  const { initials, score, total, time_seconds, pupil_uuid, topic_breakdown } = body;

  // Validate initials — 1–3 uppercase letters only
  if (typeof initials !== 'string' || !/^[A-Z]{1,3}$/.test(initials)) {
    return new Response(JSON.stringify({ error: 'Invalid initials' }), { status: 400, headers: cors });
  }

  // Validate total — must be one of the four real test sizes
  if (!VALID_TOTALS.includes(total as number)) {
    return new Response(JSON.stringify({ error: 'Invalid total' }), { status: 400, headers: cors });
  }

  // Validate score — whole number, 0 to total
  if (typeof score !== 'number' || !Number.isInteger(score) || score < 0 || score > (total as number)) {
    return new Response(JSON.stringify({ error: 'Invalid score' }), { status: 400, headers: cors });
  }

  // Validate time — must be at least MIN_SECONDS_PER_Q per question
  const minTime = (total as number) * MIN_SECONDS_PER_Q;
  if (typeof time_seconds !== 'number' || time_seconds < minTime) {
    return new Response(
      JSON.stringify({ error: 'Time too fast', min: minTime }),
      { status: 400, headers: cors }
    );
  }

  // All good — insert using service role (bypasses RLS safely server-side)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // Validate optional pupil_uuid
  const validUuid = typeof pupil_uuid === 'string' && UUID_RE.test(pupil_uuid)
    ? pupil_uuid
    : null;

  // Validate optional topic_breakdown (must be a plain object)
  const validTopicBreakdown =
    topic_breakdown && typeof topic_breakdown === 'object' && !Array.isArray(topic_breakdown)
      ? topic_breakdown
      : null;

  const { error } = await supabase.from('ma_scores').insert({
    initials,
    score,
    total,
    time_seconds,
    pupil_uuid: validUuid,
    topic_breakdown: validTopicBreakdown,
  });

  if (error) {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
  }

  return new Response(JSON.stringify({ success: true }), { headers: cors });
});
