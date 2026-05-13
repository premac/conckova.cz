'use client'

import { useActionState } from 'react'
import { loginAction, type LoginState } from './actions'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, null)

  return (
    <div className="admin-card">
      <p>Zadejte heslo pro přístup do administrace.</p>
      <form action={formAction} className="admin-form">
        <label htmlFor="password" className="admin-label">Heslo</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="admin-input"
          disabled={isPending}
          required
        />
        {state?.error && <p className="admin-error">{state.error}</p>}
        <div>
          <button type="submit" className="admin-btn" disabled={isPending}>
            {isPending ? 'Přihlašuji…' : 'Přihlásit se'}
          </button>
        </div>
      </form>
    </div>
  )
}
