-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert reservations') THEN
    CREATE POLICY "Allow public insert reservations" ON reservations FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow select own reservations') THEN
    CREATE POLICY "Allow select own reservations" ON reservations FOR SELECT TO anon USING (email = current_setting('request.jwt.claims')::json->>'email');
  END IF;
END $$;

-- Menu categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT '',
  note TEXT DEFAULT '',
  image TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read menu_categories') THEN
    CREATE POLICY "Allow public read menu_categories" ON menu_categories FOR SELECT TO anon USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin all menu_categories') THEN
    CREATE POLICY "Allow admin all menu_categories" ON menu_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  description TEXT DEFAULT '',
  includes TEXT[] DEFAULT '{}',
  serves TEXT DEFAULT '',
  image TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read menu_items') THEN
    CREATE POLICY "Allow public read menu_items" ON menu_items FOR SELECT TO anon USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin all menu_items') THEN
    CREATE POLICY "Allow admin all menu_items" ON menu_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read site_settings') THEN
    CREATE POLICY "Allow public read site_settings" ON site_settings FOR SELECT TO anon USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin all site_settings') THEN
    CREATE POLICY "Allow admin all site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Insert default site settings (ignore if already exist)
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'TheSeaPride'),
  ('whatsapp_number', '2347062270224'),
  ('instagram_url', 'https://www.instagram.com/the_sea_pride'),
  ('facebook_url', ''),
  ('twitter_url', ''),
  ('phone', '0706 227 0224'),
  ('email', 'hello@theseapride.com'),
  ('address', 'Iyana Anfani Round About, 26 MKO Abiola Way, Anfani Rd, Ringroad, Ibadan, Nigeria'),
  ('hours_mon_thu', '11am – 10pm'),
  ('hours_fri_sat', '11am – 11pm'),
  ('hours_sun', '10am – 9pm')
ON CONFLICT (key) DO NOTHING;
