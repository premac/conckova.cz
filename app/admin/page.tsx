import type { Metadata } from 'next'
import { isAuthenticated } from './actions'
import { getInstructions } from '@/lib/db'
import { SYSTEM_PROMPT } from '@/lib/systemPrompt'
import LoginForm from './LoginForm'
import EditorForm from './EditorForm'

export const metadata: Metadata = { title: 'Admin – Krejčovství Věry Čončkové' }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authed = await isAuthenticated()

  if (!authed) {
    return (
      <>
        <h1 className="ruzova">Administrace</h1>
        <LoginForm />
      </>
    )
  }

  const saved = await getInstructions()

  return (
    <>
      <h1 className="ruzova">Administrace</h1>
      <EditorForm current={saved ?? SYSTEM_PROMPT} />
    </>
  )
}
