import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './SocialIcons';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { profile } = portfolioData;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer
      id="kontak"
      className="scroll-mt-20 border-t border-zinc-200/80 bg-zinc-50/40 py-16 sm:py-20 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/40"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                06 / Kontak
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                Mari Berkolaborasi
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                Butuh website modern, aplikasi web, atau kebutuhan desain grafis untuk acara dan promosi bisnis
                Anda? Jangan ragu untuk menghubungi saya lewat email atau media sosial berikut.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  <Mail className="h-4 w-4" />
                  Kirim Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 font-mono text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      Email Tersalin!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {profile.email}
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-indigo-500"
              >
                <div className="flex items-center gap-3">
                  <GitHubIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">GitHub</p>
                    <p className="font-mono text-xs text-zinc-500">{profile.socials.githubHandle}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-400">-&gt;</span>
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-indigo-500"
              >
                <div className="flex items-center gap-3">
                  <LinkedInIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      LinkedIn
                    </p>
                    <p className="font-mono text-xs text-zinc-500">
                      {profile.socials.linkedinHandle}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-400">-&gt;</span>
              </a>

              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-indigo-500"
              >
                <div className="flex items-center gap-3">
                  <InstagramIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Instagram
                    </p>
                    <p className="font-mono text-xs text-zinc-500">
                      {profile.socials.instagramHandle}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-zinc-400">-&gt;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 sm:flex-row dark:border-zinc-800/80 dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xs dark:border-zinc-700">
              <img src="/logo.jpg" alt="Logo FG" className="h-full w-full scale-[1.7] object-contain" />
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                Terbuka untuk kolaborasi &amp; proyek baru
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <p>
                © {new Date().getFullYear()} {profile.name}
              </p>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Kembali ke atas &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
