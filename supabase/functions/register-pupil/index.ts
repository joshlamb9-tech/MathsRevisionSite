import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

  let body: { uuid?: unknown; name?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
  }

  const { uuid, name } = body;

  if (typeof uuid !== 'string' || !UUID_RE.test(uuid)) {
    return new Response(JSON.stringify({ error: 'Invalid uuid' }), { status: 400, headers: cors });
  }

  if (typeof name !== 'string' || name.trim().length < 1 || name.trim().length > 100) {
    return new Response(JSON.stringify({ error: 'Invalid name' }), { status: 400, headers: cors });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  // Insert only — do not overwrite teacher-edited names
  const { error } = await supabase.from('pupils').insert({
    id: uuid,
    name: name.trim(),
  });

  // Ignore unique-constraint error (pupil already registered)
  if (error && error.code !== '23505') {
    console.error('DB error:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500, headers: cors });
  }

  return new Response(JSON.stringify({ success: true }), { headers: cors });
});
