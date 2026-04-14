import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const videoUrl = url.searchParams.get('url');

  if (!videoUrl) {
    return new Response(JSON.stringify({ error: 'URL é obrigatório' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    const res = await fetch(oembedUrl);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Vídeo não encontrado ou URL inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json() as {
      title: string;
      author_name: string;
      thumbnail_url: string;
    };

    // Prefer high-quality thumbnail
    let thumbnail = data.thumbnail_url;
    try {
      const videoId = new URL(videoUrl).searchParams.get('v')
        || videoUrl.match(/youtu\.be\/([^?&]+)/)?.[1]
        || videoUrl.match(/embed\/([^?&]+)/)?.[1];
      if (videoId) thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch { /* keep default */ }

    return new Response(JSON.stringify({
      title: data.title,
      channel: data.author_name,
      thumbnail,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao obter informações do vídeo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
