'use client'

import { useActionState } from 'react'
import { saveAction, logoutAction, type SaveState } from './actions'

export default function EditorForm({ current }: { current: string }) {
  const [state, formAction, isPending] = useActionState<SaveState, FormData>(saveAction, null)

  return (
    <div className="admin-card">
      <p>
        Upravte instrukce pro chatovacího asistenta. Změny se projeví okamžitě na všech
        nových konverzacích.
      </p>
      <form action={formAction} className="admin-form">
        <label htmlFor="instructions" className="admin-label">Instrukce</label>
        <textarea
          id="instructions"
          name="instructions"
          defaultValue={current}
          rows={24}
          className="admin-textarea"
          disabled={isPending}
          required
        />
        {state?.error && <p className="admin-error">{state.error}</p>}
        {state?.ok && <p className="admin-success">Instrukce byly uloženy.</p>}
        <div className="admin-btn-row">
          <button type="submit" className="admin-btn" disabled={isPending}>
            {isPending ? 'Ukládám…' : 'Uložit instrukce'}
          </button>
          <form action={logoutAction}>
            <button type="submit" className="admin-btn admin-btn-outline">
              Odhlásit se
            </button>
          </form>
        </div>
      </form>
    </div>
  )
}
