import pg from "pg";

const PASSWORD = "Highschool1@2653";
const PROJECT_REF = "kjbbjgnqusghdyundseh";

const configs = [
  {
    name: "Direct (modern)",
    connectionString: `postgresql://postgres:${encodeURIComponent(PASSWORD)}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "Pooler us-east-1",
    connectionString: `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "Pooler eu-west-1",
    connectionString: `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "Pooler eu-central-1",
    connectionString: `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "Pooler ap-southeast-1",
    connectionString: `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(PASSWORD)}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
  },
  {
    name: "Direct (old format)",
    connectionString: `postgresql://postgres:${encodeURIComponent(PASSWORD)}@${PROJECT_REF}.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false },
  },
];

async function tryConnect(config) {
  const client = new pg.Client(config);
  try {
    await client.connect();
    console.log(`✅ Connected via: ${config.name}`);

    const sql = `
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

      DROP POLICY IF EXISTS "Allow public insert reservations" ON reservations;
      CREATE POLICY "Allow public insert reservations"
        ON reservations FOR INSERT
        TO anon
        WITH CHECK (true);
    `;

    await client.query(sql);
    console.log("✅ Reservations table created successfully!");
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ ${config.name}: ${err.message}`);
    try { await client.end(); } catch {}
    return false;
  }
}

async function main() {
  for (const config of configs) {
    if (await tryConnect(config)) {
      return;
    }
  }
  console.log("\n❌ Could not connect to database with any configuration.");
}

main();
