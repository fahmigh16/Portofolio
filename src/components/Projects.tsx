import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { portfolioData, type Project, type ProjectCategory } from '../data/portfolio';
import { GitHubIcon } from './SocialIcons';

type FilterType = 'all' | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const devCount = projects.filter((p) => p.category === 'dev').length;
  const designCount = projects.filter((p) => p.category === 'design').length;

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const filterButtons: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'Semua', count: projects.length },
    { key: 'dev', label: 'Software Dev', count: devCount },
    { key: 'design', label: 'Desain Grafis', count: designCount },
  ];

  return (
    <section
      id="proyek"
      className="scroll-mt-20 border-t border-zinc-200/80 py-16 sm:py-20 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              03 / Portofolio Karya
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Proyek Pilihan
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Koleksi proyek pengembangan perangkat lunak berbasis repositori GitHub. Klik kartu untuk melihat
              detail tantangan, solusi arsitektur, dan tautan kode/demo.
            </p>
          </div>

          {designCount > 0 && (
            <div
              role="tablist"
              aria-label="Filter kategori proyek"
              className="inline-flex rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900"
            >
            {filterButtons.map((btn) => {
              const active = filter === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(btn.key)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                >
                  {btn.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] ${active
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}
                  >
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Lihat detail proyek ${project.title}`}
              className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                    {project.year}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`GitHub repo ${project.title}`}
                        className="rounded-lg p-1 text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                        <GitHubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Live demo ${project.title}`}
                        className="rounded-lg p-1 text-zinc-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 text-base font-bold text-zinc-900 transition-colors group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Detail Proyek */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {selectedProject.category === 'dev' ? 'Software Development' : 'Desain Grafis'} •{' '}
                  {selectedProject.year}
                </span>
                <h3
                  id="modal-project-title"
                  className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup detail proyek"
                className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {selectedProject.description}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="font-mono text-[11px] font-semibold uppercase text-zinc-500">
                  Tantangan
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedProject.challenge}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="font-mono text-[11px] font-semibold uppercase text-zinc-500">
                  Solusi
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-mono text-[11px] font-semibold uppercase text-zinc-500">
                Teknologi &amp; Tools
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3.5 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Lihat Kode
                </a>
              )}
              {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              )}
              {selectedProject.designUrl && (
                <a
                  href={selectedProject.designUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-500"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Lihat Galeri Desain
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
