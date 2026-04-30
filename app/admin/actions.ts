'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSessionToken, verifySessionToken } from '@/lib/auth'
import { setInstructions } from '@/lib/db'

const COOKIE_NAME = 'admin_session'
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/admin',
  maxAge: 60 * 60 * 24 * 30,
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  return verifySessionToken(token ?? '')
}

export type LoginState = { error?: string } | null

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get('password')?.toString() ?? ''
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'Nesprávné heslo.' }
  }
  const jar = await cookies()
  jar.set(COOKIE_NAME, createSessionToken(), COOKIE_OPTS)
  redirect('/admin')
}

export type SaveState = { ok?: boolean; error?: string } | null

export async function saveAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  const jar = await cookies()
  if (!verifySessionToken(jar.get(COOKIE_NAME)?.value ?? '')) {
    return { error: 'Nejste přihlášeni.' }
  }
  const instructions = formData.get('instructions')?.toString() ?? ''
  if (!instructions.trim()) {
    return { error: 'Instrukce nesmí být prázdné.' }
  }
  try {
    await setInstructions(instructions)
    return { ok: true }
  } catch {
    return { error: 'Uložení se nezdařilo. Zkuste to znovu.' }
  }
}

export async function logoutAction(): Promise<void> {
  const jar = await cookies()
  jar.delete({ name: COOKIE_NAME, path: '/admin' })
  redirect('/admin')
}
