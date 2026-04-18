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
  duration?: string;
  rating?: number;                                  // 1-5 stars
  moments?: Array<{ time: string; note: string }>; // key timestamps
  collection?: string;                              // project/folder
  clipType?: 'tutorial' | 'inspiration' | 'research' | 'entertainment' | 'news' | 'other';
}

async function getClips(env: Env): Promise<Clip[]> {
  const json = await env.CLIPS_KV.get('clips');
  return json ? JSON.parse(json) : [];
}

async function saveClips(env: Env, clips: Clip[]): Promise<void> {
  await env.CLIPS_KV.put('clips', JSON.stringify(clips));
}

export const GET: APIRoute = async ({ locals }) => {
  try {
    const clips = await getClips(locals.runtime.env);
    return new Response(JSON.stringify(clips), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao carregar clips' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const password = request.headers.get('X-Admin-Password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const body = await request.json() as Partial<Clip>;
    if (!body.url || !body.title) {
      return new Response(JSON.stringify({ error: 'URL e título são obrigatórios' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }
    const clips = await getClips(env);
    const newClip: Clip = {
      id: crypto.randomUUID(),
      url: body.url,
      title: body.title,
      description: body.description || '',
      tags: body.tags || [],
      date: new Date().toISOString(),
      scheduledDate: body.scheduledDate,
      stage: body.stage || 'to-watch',
      thumbnail: body.thumbnail,
      channel: body.channel,
      duration: body.duration,
      rating: body.rating,
      moments: body.moments || [],
      collection: body.collection,
      clipType: body.clipType,
    };
    clips.unshift(newClip);
    await saveClips(env, clips);
    return new Response(JSON.stringify(newClip), {
      status: 201, headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao criar clip' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;
  const password = request.headers.get('X-Admin-Password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Não autorizado' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const body = await request.json() as { id: string } & Partial<Clip>;
    const { id, ...updates } = body;
    const clips = await getClips(env);
    const idx = clips.findIndex((c) => c.id === id);
    if (idx === -1) {
      return new Response(JSON.stringify({ error: 'Clip não encontrado' }), {
        status: 404, headers: { 'Content-Type': 'application/json' },
      });
    }
    clips[idx] = { ...clips[idx], ...updates };
    await saveClips(env, clips);
    return new Response(JSON.stringify(clips[idx]), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao atualizar clip' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
