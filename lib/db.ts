import { neon } from '@neondatabase/serverless'

function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

async function ensureTable() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `
}

export async function getInstructions(): Promise<string | null> {
  try {
    await ensureTable()
    const sql = getDb()
    const rows = await sql`SELECT value FROM settings WHERE key = 'chat_instructions'`
    return (rows[0] as { value: string } | undefined)?.value ?? null
  } catch (err) {
    console.error('[db] getInstructions failed:', err)
    return null
  }
}

export async function setInstructions(value: string): Promise<void> {
  await ensureTable()
  const sql = getDb()
  await sql`
    INSERT INTO settings (key, value) VALUES ('chat_instructions', ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `
}
