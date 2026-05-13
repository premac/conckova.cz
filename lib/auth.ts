import { createHmac, timingSafeEqual } from 'crypto'

function sign(payload: string): string {
  const secret = process.env.ADMIN_SECRET ?? ''
  return createHmac('sha256', secret).update(payload).digest('hex')
}

export function createSessionToken(): string {
  const payload = Buffer.from(JSON.stringify({ ts: Date.now() })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string): boolean {
  if (!token || !process.env.ADMIN_SECRET) return false
  const dot = token.lastIndexOf('.')
  if (dot === -1) return false
  const payload = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = sign(payload)
  try {
    const a = Buffer.from(sig, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
