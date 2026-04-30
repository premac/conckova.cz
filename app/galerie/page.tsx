import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Galerie – Krejčovství Věry Čončkové' }

const items = [
  { label: 'Sako', color: 'zluta', src: '/galerie/sako5.jpg' },
  { label: 'Bunda', color: 'modra', src: '/galerie/bunda.jpg' },
  { label: 'Sako', color: 'ruzova', src: '/galerie/sako6.jpg' },
  { label: 'Šaty', color: 'zelena', src: '/galerie/saty2.jpg' },
  { label: 'Kabát', color: 'zluta', src: '/galerie/kabat2.jpg' },
  { label: 'Sako s nabíranou fazonou', color: 'modra', src: '/galerie/sako3.jpg' },
  { label: 'Krajkové sako a pouzdrové šaty', color: 'ruzova', src: '/galerie/sako4.jpg' },
  { label: 'Šaty', color: 'ruzova', src: '/galerie/saty.jpg' },
  { label: 'Sako', color: 'zelena', src: '/galerie/obr1.jpg' },
  { label: 'Halenka', color: 'ruzova', src: '/galerie/obr3.jpg' },
  { label: 'Kostýmek', color: 'zluta', src: '/galerie/obr7.jpg' },
  { label: 'Halenka', color: 'ruzova', src: '/galerie/obr8.jpg' },
  { label: 'Sako', color: 'zelena', src: '/galerie/obr9.jpg' },
  { label: 'Sako a halenka', color: 'modra', src: '/galerie/obr10.jpg' },
  { label: 'Halenka', color: 'zluta', src: '/galerie/obr11.jpg' },
  { label: 'Sako', color: 'modra', src: '/galerie/sako1.jpg' },
  { label: 'Sako', color: 'zelena', src: '/galerie/sako2.jpg' },
  { label: 'Kabát', color: 'zluta', src: '/galerie/kabat.jpg' },
]

const mazoretky = [
  '/galerie/mazoretky1.jpg',
  '/galerie/mazoretky2.jpg',
  '/galerie/mazoretky3.jpg',
]

export default function Galerie() {
  return (
    <>
      <h1 className="zluta">Galerie</h1>
      <p>Několik obrázků mých prací:</p>

      {items.map((item, i) => (
        <p key={i} style={{ textAlign: 'center' }}>
          <span className={item.color}><b>{item.label}</b></span><br />
          <img alt={item.label} src={item.src} className="galerie" />
        </p>
      ))}

      <p style={{ textAlign: 'center' }}>
        <span className="zluta"><b>Mažoretky z Horní Lhoty</b></span><br />
        {mazoretky.map((src, i) => (
          <span key={i}>
            <img alt="Mažoretky" src={src} className="galerie" /><br />
          </span>
        ))}
      </p>
    </>
  )
}
