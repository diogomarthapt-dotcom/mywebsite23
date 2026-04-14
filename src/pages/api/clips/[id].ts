import type { APIRoute } from 'astro';

export const prerender = false;

interface Clip {
  id: string;
}

export const DELETE: APIRoute = async ({ params, request, locals }) => {
  const { env } = locals.runtime;

  const password = request.headers.get('X-Admin-Password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { id } = params;

  try {
    const clipsJson = await env.CLIPS_KV.get('clips');
    const clips: Clip[] = clipsJson ? JSON.parse(clipsJson) : [];
    const filtered = clips.filter((c) => c.id !== id);

    if (filtered.length === clips.length) {
      return new Response(JSON.stringify({ error: 'Clip não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await env.CLIPS_KV.put('clips', JSON.stringify(filtered));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao apagar clip' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
