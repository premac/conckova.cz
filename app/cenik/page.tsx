import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ceník – Krejčovství Věry Čončkové' }

export default function Cenik() {
  return (
    <>
      <h1 className="ruzova">Ceník</h1>

      <p>
        Uvedené ceny <span className="zluta"><b>nezahrnují materiál</b></span> a jsou pouze
        orientační. Podle složitosti provedení mohou být až o 20 procent vyšší.
      </p>

      <table style={{ borderSpacing: '3px', borderCollapse: 'separate', margin: '0 auto', width: '60%' }}>
        <tbody>
          <tr><td>Sako nepodšité</td><td style={{ textAlign: 'right' }}>1&nbsp;000,&ndash;</td></tr>
          <tr><td>Sako podšité</td><td style={{ textAlign: 'right' }}>1&nbsp;500,&ndash;</td></tr>
          <tr><td>Bunda nepodšitá</td><td style={{ textAlign: 'right' }}>800,&ndash;</td></tr>
          <tr><td>Bunda podšitá</td><td style={{ textAlign: 'right' }}>1&nbsp;200,&ndash;</td></tr>
          <tr><td>Sukně nepodšitá</td><td style={{ textAlign: 'right' }}>400,&ndash;</td></tr>
          <tr><td>Sukně podšitá</td><td style={{ textAlign: 'right' }}>520,&ndash;</td></tr>
          <tr><td>Kalhoty bez kapes</td><td style={{ textAlign: 'right' }}>400,&ndash;</td></tr>
          <tr><td>Kalhoty s kapsama</td><td style={{ textAlign: 'right' }}>450,&ndash;</td></tr>
          <tr><td>Halenka</td><td style={{ textAlign: 'right' }}>400,&ndash;</td></tr>
          <tr><td>Kostýmek dvojkombinace *</td><td style={{ textAlign: 'right' }}>1&nbsp;500,&ndash;</td></tr>
          <tr><td>Kostýmek trojkombinace **</td><td style={{ textAlign: 'right' }}>2&nbsp;000,&ndash;</td></tr>
          <tr><td>Kostýmek dvojkombinace podšitý *</td><td style={{ textAlign: 'right' }}>2&nbsp;000,&ndash;</td></tr>
          <tr><td>Kostýmek trojkombinace podšitý **</td><td style={{ textAlign: 'right' }}>2&nbsp;500,&ndash;</td></tr>
          <tr><td>Šaty</td><td style={{ textAlign: 'right' }}>800,&ndash;</td></tr>
          <tr><td>Plášť podšitý</td><td style={{ textAlign: 'right' }}>2&nbsp;000,&ndash;</td></tr>
          <tr><td>Paleto s kapucí podšité</td><td style={{ textAlign: 'right' }}>1&nbsp;800,&ndash;</td></tr>
          <tr><td>Opravy, úpravy</td><td style={{ textAlign: 'right' }}>cena dohodou</td></tr>
        </tbody>
      </table>

      <p>
        *&nbsp;&nbsp;<span className="zluta">Sako + sukně nebo kalhoty</span>
        <br />
        **&nbsp;&nbsp;<span className="zelena">Sako + sukně + kalhoty</span>
      </p>
    </>
  )
}
