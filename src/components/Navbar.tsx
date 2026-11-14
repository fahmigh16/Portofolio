import { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const navLinks = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Keahlian', href: '#keahlian' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Sertifikasi', href: '#sertifikasi' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Kontak', href: '#kontak' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-zinc-50/70 backdrop-blur-md transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex items-center gap-3 text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-transform group-hover:scale-105 dark:border-zinc-700">
            <img
              src="/logo.jpg"
              alt="Logo Fahmi Ghozali"
              className="h-full w-full scale-[1.75] object-contain transition-transform"
            />
          </span>
          <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {portfolioData.profile.name}
          </span>
        </a>

        <nav aria-label="Navigasi Utama" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#kontak"
            className="hidden rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-700 sm:inline-flex dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Hubungi Saya
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Navigasi Mobile"
          className="border-t border-zinc-200 bg-zinc-50 px-4 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800/70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

