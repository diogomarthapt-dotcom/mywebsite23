import type { APIRoute } from 'astro';

export const prerender = false;

interface Clip {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export const GET: APIRoute = async ({ locals }) => {
  const { env } = locals.runtime;
  try {
    const clipsJson = await env.CLIPS_KV.get('clips');
    const clips: Clip[] = clipsJson ? JSON.parse(clipsJson) : [];
    return new Response(JSON.stringify(clips), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao carregar clips' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;

  const password = request.headers.get('X-Admin-Password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json() as {
      url?: string;
      title?: string;
      description?: string;
      tags?: string[];
    };
    const { url, title, description, tags } = body;

    if (!url || !title) {
      return new Response(JSON.stringify({ error: 'URL e título são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const clipsJson = await env.CLIPS_KV.get('clips');
    const clips: Clip[] = clipsJson ? JSON.parse(clipsJson) : [];

    const newClip: Clip = {
      id: crypto.randomUUID(),
      url,
      title,
      description: description || '',
      tags: tags || [],
      date: new Date().toISOString(),
    };

    clips.unshift(newClip);
    await env.CLIPS_KV.put('clips', JSON.stringify(clips));

    return new Response(JSON.stringify(newClip), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao criar clip' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
