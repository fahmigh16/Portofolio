import { useState } from 'react';
import { portfolioData, type ExperienceItem } from '../data/portfolio';
import { DualIDCardLanyard } from './ui/id-card-lanyard';

export function Experience() {
  const { experience } = portfolioData;
  const [activeTab, setActiveTab] = useState<'all' | 'organisasi' | 'project'>('all');

  const orgItems = experience.filter((item) => item.category === 'organisasi');
  const projectItems = experience.filter((item) => item.category === 'project');

  const idCardConfigs = {
    hmjti: {
      name: 'Fahmi Ghozali',
      role: 'Kadep Medinfo',
      brand: 'HMJ TEKNOLOGI INFORMASI',
      brandTagline: 'Kabinet Sankara',
      pillars: ['Inovasi', 'Kolaborasi', 'Media'] as [string, string, string],
      location: 'Polinela, Lampung',
      idNumber: '24781009',
      validThru: '2024 – 2026',
      site: 'fahmighozali.dev',
      cardImage: '/id-cards/id-card-hmjti.jpg',
      githubUrl: 'https://github.com/fahmigh16',
      instagramUrl: 'https://instagram.com/hmjtipolinela',
    },
    pointer: {
      name: 'FAHMI GHOZALI',
      role: 'Wakil Ketua Divisi Medinfo',
      brand: 'HIMA POINTER',
      brandTagline: 'Polinela IT Center 2026/2027',
      pillars: ['Kreatif', 'Teknis', 'Solid'] as [string, string, string],
      location: 'Polinela, Lampung',
      idNumber: '24781009',
      validThru: '2026 – 2027',
      site: 'fahmighozali.dev',
      cardImage: '/id-cards/id-card-pointer.jpg',
      githubUrl: 'https://github.com/fahmigh16',
      instagramUrl: 'https://instagram.com/mi_polinela',
    },
  };

  const renderCard = (item: ExperienceItem) => {
    return (
      <div
        key={item.id}
        className="relative rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/60"
      >
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {item.role}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {item.organization}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {item.type}
            </span>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {item.period}
            </span>
          </div>
        </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>

        <ul className="mt-4 space-y-1.5">
          {item.highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      );
  };

      return (
      <section
        id="pengalaman"
        className="scroll-mt-20 border-t border-zinc-200/80 py-16 sm:py-20 dark:border-zinc-800/80"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              05 / Pengalaman
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Organisasi &amp; Project
            </h2>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Ringkasan pengalaman berorganisasi dan Project
            </p>
          </div>

          {/* Tab Filter */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${activeTab === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border border-zinc-200 bg-white/60 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
            >
              Semua ({experience.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('organisasi')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${activeTab === 'organisasi'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border border-zinc-200 bg-white/60 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
            >
              Berorganisasi ({orgItems.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('project')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${activeTab === 'project'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border border-zinc-200 bg-white/60 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
            >
              Project ({projectItems.length})
            </button>
          </div>

          {/* Daftar Pengalaman Terbagi 2 Bagian */}
          <div className="mt-8 space-y-10">
            {(activeTab === 'all' || activeTab === 'organisasi') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Pengalaman Berorganisasi
                    </h3>
                    <span className="font-mono text-xs text-zinc-500">
                      ({orgItems.length})
                    </span>
                  </div>

                  <div className="space-y-4">
                    {orgItems.map(renderCard)}
                  </div>

                  {/* ID Card Lanyard 3D Standalone Showcase (Side by Side) */}
                  <div
                    id="id-card-showcase"
                    className="relative w-full overflow-visible py-2"
                  >
                    <DualIDCardLanyard
                      cardLeft={idCardConfigs.hmjti}
                      cardRight={idCardConfigs.pointer}
                    />
                  </div>
                </div>
          )}

                {(activeTab === 'all' || activeTab === 'project') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-zinc-200/80 pb-2 dark:border-zinc-800/80">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        Pengalaman Project
                      </h3>
                      <span className="font-mono text-xs text-zinc-500">
                        ({projectItems.length})
                      </span>
                    </div>
                    <div className="space-y-4">
                      {projectItems.map(renderCard)}
                    </div>
                  </div>
                )}
              </div>
      </div>
    </section>
  );
}

