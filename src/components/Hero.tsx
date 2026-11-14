import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './SocialIcons';

export function Hero() {
  const { profile } = portfolioData;
  const fullName = profile.name;
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullName.length) {
          currentIndex++;
          setDisplayText(fullName.slice(0, currentIndex));
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(startDelay);
  }, [fullName]);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="relative left-1/2 aspect-[1155/678] w-[42rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-500/20 via-cyan-400/15 to-violet-500/20 opacity-70 dark:opacity-35" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1
            className="min-h-[1.15em] text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50"
            aria-label={fullName}
          >
            <span>{displayText}</span>
            <span
              className="ml-1 inline-block h-[0.82em] w-[3px] align-baseline bg-indigo-600 sm:w-[4px] dark:bg-indigo-400 animate-cursor"
              aria-hidden="true"
            />
          </h1>

          <p className="mt-3 font-mono text-base font-semibold text-indigo-600 sm:text-lg dark:text-indigo-400">
            {profile.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            {profile.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            >
              Lihat Karya
            </a>
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition-all hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Hubungi Saya
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="mr-1 font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Terhubung:
            </span>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Fahmi Ghozali"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Fahmi Ghozali"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Fahmi Ghozali"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              {profile.socials.instagramHandle}
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Fahmi Ghozali"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
