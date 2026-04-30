import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zakázkové dámské krejčovství Věry Čončkové',
  description: 'Zakázkové dámské krejčovství v regionu Opava a Ostrava',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <header className="modern-header">
          <div className="hero-wrapper">
            <img src="/img/title_2.jpg" alt="" className="hero" />
            <div className="hero-overlay">
              <h1 className="site-title">
                Dámské krejčovství <span>Věra Čončková</span>
              </h1>
            </div>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link href="/">Úvod</Link></li>
              <li><Link href="/cenik">Ceník</Link></li>
              <li><Link href="/galerie">Galerie</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/chat">Chat</Link></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="modern-footer">
          <p>
            &copy; {new Date().getFullYear()} Věra Čončková &middot; vytvořil{' '}
            <a href="mailto:premysl@concka.com">Přemysl Čončka</a>
          </p>
        </footer>
      </body>
    </html>
  )
}
