import type { APIRoute } from 'astro';
import { quintas } from '../../../data/quintas';

export const prerender = false;

// ── GET /api/orders/:farmSlug?pin=XXXX  (list farm orders) ───────────────────
export const GET: APIRoute = async ({ params, request, locals }) => {
  const db: D1Database | undefined = (locals.runtime?.env as Env | undefined)?.DB;
  if (!db) {
    return json({ error: 'Base de dados não configurada.' }, 503);
  }

  const { farmSlug } = params;
  const url = new URL(request.url);
  const pin = url.searchParams.get('pin') ?? '';

  // Verify PIN
  const quinta = quintas.find(q => q.slug === farmSlug);
  if (!quinta) return json({ error: 'Quinta não encontrada.' }, 404);
  if (quinta.dashPin !== pin) return json({ error: 'PIN incorrecto.' }, 401);

  const { results } = await db
    .prepare(
      `SELECT id, customer_name, customer_phone, delivery_type, address, postal, city,
              items, subtotal, delivery_fee, total, status, created_at
       FROM orders
       WHERE farm_slug = ?
       ORDER BY created_at DESC
       LIMIT 100`,
    )
    .bind(farmSlug)
    .all();

  const orders = results.map((r: Record<string, unknown>) => ({
    ...r,
    items: (() => { try { return JSON.parse(r.items as string); } catch { return []; } })(),
  }));

  return json({ orders }, 200);
};

// ── PATCH /api/orders/:orderId  (update status) ──────────────────────────────
export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const db: D1Database | undefined = (locals.runtime?.env as Env | undefined)?.DB;
  if (!db) return json({ error: 'Base de dados não configurada.' }, 503);

  const { farmSlug } = params; // re-used param = orderId here
  const { status, pin, farm_slug } = await request.json() as {
    status: string; pin: string; farm_slug: string;
  };

  const quinta = quintas.find(q => q.slug === farm_slug);
  if (!quinta || quinta.dashPin !== pin) return json({ error: 'Não autorizado.' }, 401);

  const allowed = ['pending', 'confirmed', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) return json({ error: 'Estado inválido.' }, 400);

  await db
    .prepare('UPDATE orders SET status = ? WHERE id = ? AND farm_slug = ?')
    .bind(status, farmSlug, farm_slug)
    .run();

  return json({ ok: true }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
