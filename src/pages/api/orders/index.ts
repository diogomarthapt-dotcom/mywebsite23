import type { APIRoute } from 'astro';

export const prerender = false;

// Tiny ID generator — no external deps
function nanoId(len = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ── POST /api/orders  (create new order) ─────────────────────────────────────
export const POST: APIRoute = async ({ request, locals }) => {
  const db: D1Database | undefined = (locals.runtime?.env as Env | undefined)?.DB;

  if (!db) {
    return new Response(
      JSON.stringify({ error: 'Base de dados não configurada. Contacte o administrador.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const {
    farm_slug, farm_name,
    customer_name, customer_phone, customer_email,
    delivery_type, address, postal, city, notes,
    items, subtotal, delivery_fee, total,
  } = body as Record<string, unknown>;

  // Basic validation
  if (!farm_slug || !customer_name || !customer_phone || !delivery_type || !items) {
    return new Response(JSON.stringify({ error: 'Campos obrigatórios em falta.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = nanoId(14);
  const itemsJson = typeof items === 'string' ? items : JSON.stringify(items);

  try {
    await db
      .prepare(
        `INSERT INTO orders
           (id, farm_slug, farm_name, customer_name, customer_phone, customer_email,
            delivery_type, address, postal, city, notes,
            items, subtotal, delivery_fee, total)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      )
      .bind(
        id,
        farm_slug ?? '', farm_name ?? '',
        customer_name, customer_phone, customer_email ?? null,
        delivery_type, address ?? null, postal ?? null, city ?? null, notes ?? null,
        itemsJson,
        subtotal ?? 0, delivery_fee ?? 0, total ?? 0,
      )
      .run();

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DB insert error:', err);
    return new Response(JSON.stringify({ error: 'Erro ao guardar encomenda.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
