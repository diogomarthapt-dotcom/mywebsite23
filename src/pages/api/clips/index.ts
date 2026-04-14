import type { APIRoute } from 'astro';

export const prerender = false;

export interface Clip {
  id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  scheduledDate?: string;
  stage: 'to-watch' | 'watching' | 'watched';
  thumbnail?: string;
  channel?: string;
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
      scheduledDate?: string;
      stage?: string;
      thumbnail?: string;
      channel?: string;
    };
    const { url, title, description, tags, scheduledDate, stage, thumbnail, channel } = body;

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
      scheduledDate: scheduledDate || undefined,
      stage: (stage as Clip['stage']) || 'to-watch',
      thumbnail: thumbnail || undefined,
      channel: channel || undefined,
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

export const PATCH: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;

  const password = request.headers.get('X-Admin-Password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json() as { id: string; stage: Clip['stage'] };
    const { id, stage } = body;

    const clipsJson = await env.CLIPS_KV.get('clips');
    const clips: Clip[] = clipsJson ? JSON.parse(clipsJson) : [];
    const clip = clips.find((c) => c.id === id);

    if (!clip) {
      return new Response(JSON.stringify({ error: 'Clip não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    clip.stage = stage;
    await env.CLIPS_KV.put('clips', JSON.stringify(clips));

    return new Response(JSON.stringify(clip), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar clip' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
