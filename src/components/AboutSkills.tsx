import { portfolioData } from '../data/portfolio';

export function AboutSkills() {
  const { profile, skills } = portfolioData;

  return (
    <>
      {/* Tentang */}
      <section id="tentang" className="scroll-mt-20 border-t border-zinc-200/80 py-16 sm:py-20 dark:border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                01 / Tentang Saya
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
                Kode yang Fungsional, Visual yang Berbicara
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-zinc-600 lg:col-span-8 dark:text-zinc-400">
              {profile.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Pendekatan Engineering
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Struktur komponen yang rapi, performa ringan, dan pengalaman pengguna yang mulus
                    di desktop maupun mobile.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Pendekatan Desain Grafik
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Komposisi visual yang seimbang, tipografi tegas, dan pesan dari design yang langsung
                    tertangkap audiens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keahlian */}
      <section id="keahlian" className="scroll-mt-20 border-t border-zinc-200/80 py-16 sm:py-20 dark:border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              02 / Keahlian
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Dua Pilar Utama
            </h2>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Kombinasi kemampuan teknis pengembangan perangkat lunak dan desain grafis.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/60">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Software Development
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Web App, UI Engineering &amp; Integrasi Sistem
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.development.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/60">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Design &amp; Grafis
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Poster Promosi, Poster Acara &amp; lain - lain
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.design.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

