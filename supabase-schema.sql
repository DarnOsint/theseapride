-- Reservations table
CREATE TABLE reservations (
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

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (public form submissions)
CREATE POLICY "Allow public insert reservatons"
  ON reservations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading own reservation by email (optional)
CREATE POLICY "Allow select own reservations"
  ON reservations FOR SELECT
  TO anon
  USING (email = current_setting('request.jwt.claims')::json->>'email');
