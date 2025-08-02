import type { APIContext } from 'astro';

export async function POST({ request }: APIContext) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON in request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const username = import.meta.env.N8N_USERNAME;
  const password = import.meta.env.N8N_PASSWORD;
  const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

  const response = await fetch('https://hatemabsi.app.n8n.cloud/webhook/excusebot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeader
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}