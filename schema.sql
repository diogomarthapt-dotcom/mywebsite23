-- Colheita Pilot — Cloudflare D1 Schema
--
-- One-time setup:
--   npx wrangler d1 create colheita-pilot
--   # Copy the database_id into wrangler.json
--   npx wrangler d1 execute colheita-pilot --remote --file=schema.sql
--
-- Local dev (no Cloudflare account needed):
--   npx wrangler d1 execute colheita-pilot --local --file=schema.sql
--   npx wrangler dev   (or: npm run preview)

-- ─── Orders ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id           TEXT    PRIMARY KEY,        -- nanoid generated on insert
  farm_slug    TEXT    NOT NULL,
  farm_name    TEXT    NOT NULL,
  customer_name  TEXT  NOT NULL,
  customer_phone TEXT  NOT NULL,
  customer_email TEXT,
  delivery_type  TEXT  NOT NULL CHECK(delivery_type IN ('pickup','delivery')),
  address      TEXT,
  postal       TEXT,
  city         TEXT,
  notes        TEXT,
  items        TEXT    NOT NULL,           -- JSON: [{id,name,emoji,qty,price,unit}]
  subtotal     REAL    NOT NULL,
  delivery_fee REAL    NOT NULL DEFAULT 0,
  total        REAL    NOT NULL,
  status       TEXT    NOT NULL DEFAULT 'pending'
                       CHECK(status IN ('pending','confirmed','delivered','cancelled')),
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- Index for farmer dashboard queries
CREATE INDEX IF NOT EXISTS idx_orders_farm_slug ON orders(farm_slug);
CREATE INDEX IF NOT EXISTS idx_orders_status    ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created   ON orders(created_at DESC);
