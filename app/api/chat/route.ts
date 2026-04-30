import { streamText, tool } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { Resend } from 'resend'
import { z } from 'zod'
import { SYSTEM_PROMPT } from '@/lib/systemPrompt'
import { getInstructions } from '@/lib/db'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)
  const systemPrompt = (await getInstructions()) ?? SYSTEM_PROMPT

  const result = streamText({
    model: anthropic('claude-sonnet-4-5'),
    system: systemPrompt,
    messages,
    tools: {
      sendInquiryEmail: tool({
        description: 'Odešle shrnutí zákaznické poptávky e-mailem paní Čončkové. Zavolej tento nástroj ihned poté, co zákazník potvrdí odeslání.',
        parameters: z.object({
          customerName: z.string().describe('Jméno zákazníka'),
          contactInfo: z.string().describe('Email nebo telefon zákazníka'),
          garmentType: z.string().describe('Typ oděvu (sako, šaty, kalhoty, oprava…)'),
          material: z.string().describe('Materiál a barevná představa'),
          measurements: z.string().describe('Míry zákazníka, nebo poznámka že přijde na odměření'),
          deadline: z.string().describe('Požadovaný termín dokončení'),
          notes: z.string().optional().describe('Další poznámky a přání zákazníka'),
        }),
        execute: async (params) => {
          const ownerEmail = process.env.OWNER_EMAIL
          if (!ownerEmail) {
            console.error('OWNER_EMAIL not set')
            return { success: false, error: 'Server configuration error' }
          }

          try {
            await resend.emails.send({
              from: process.env.FROM_EMAIL ?? 'onboarding@resend.dev',
              to: ownerEmail,
              subject: `Nová poptávka přes web: ${params.garmentType} – ${params.customerName}`,
              text: formatEmailText(params),
              html: formatEmailHtml(params),
            })
            return { success: true }
          } catch (error) {
            console.error('Failed to send email:', error)
            return { success: false, error: 'Email sending failed' }
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}

interface EmailParams {
  customerName: string
  contactInfo: string
  garmentType: string
  material: string
  measurements: string
  deadline: string
  notes?: string
}

function formatEmailText(p: EmailParams): string {
  return [
    'Nová poptávka přes webový chat – conckova.cz',
    '',
    `Zákazník:    ${p.customerName}`,
    `Kontakt:     ${p.contactInfo}`,
    `Oděv:        ${p.garmentType}`,
    `Materiál:    ${p.material}`,
    `Míry:        ${p.measurements}`,
    `Termín:      ${p.deadline}`,
    p.notes ? `Poznámky:    ${p.notes}` : '',
    '',
    '---',
    'Zpráva odeslána automaticky přes chat na webu conckova.cz',
  ]
    .filter((line) => line !== undefined)
    .join('\n')
}

function formatEmailHtml(p: EmailParams): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;white-space:nowrap;color:#555">${label}</td><td style="padding:6px 12px">${value}</td></tr>`

  return `
<!DOCTYPE html>
<html lang="cs">
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#fafafa;margin:0;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0">
    <div style="background:#ed497b;padding:20px 24px">
      <h1 style="color:#fff;margin:0;font-size:1.3rem">Nová poptávka přes web</h1>
      <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:0.9rem">conckova.cz</p>
    </div>
    <div style="padding:24px">
      <table style="border-collapse:collapse;width:100%">
        ${row('Zákazník', p.customerName)}
        ${row('Kontakt', p.contactInfo)}
        ${row('Oděv', p.garmentType)}
        ${row('Materiál', p.material)}
        ${row('Míry', p.measurements)}
        ${row('Termín', p.deadline)}
        ${p.notes ? row('Poznámky', p.notes) : ''}
      </table>
    </div>
    <div style="background:#f5f5f5;padding:12px 24px;font-size:0.8rem;color:#999">
      Zpráva odeslána automaticky přes chat na webu conckova.cz
    </div>
  </div>
</body>
</html>`
}
