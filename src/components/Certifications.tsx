import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { portfolioData, type CertificationItem } from '../data/portfolio';

type CertFilter = 'all' | CertificationItem['category'];

export function Certifications() {
  const [filter, setFilter] = useState<CertFilter>('all');
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const certifications = portfolioData.certifications;
  const filteredCertifications =
    filter === 'all' ? certifications : certifications.filter((c) => c.category === filter);

  const devCount = certifications.filter((c) => c.category === 'Development').length;
  const designCount = certifications.filter((c) => c.category === 'Design').length;

  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  const filterButtons: { key: CertFilter; label: string; count: number }[] = [
    { key: 'all', label: 'Semua', count: certifications.length },
    { key: 'Development', label: 'Software Dev', count: devCount },
    { key: 'Design', label: 'Desain Grafis', count: designCount },
  ];

  return (
    <section
      id="sertifikasi"
      className="scroll-mt-20 border-t border-zinc-200/80 py-16 sm:py-20 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              04 / Sertifikasi
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              Sertifikat &amp; Lisensi Kompetensi
            </h2>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Galeri kredensial dan sertifikasi resmi di bidang software engineering, kecerdasan buatan (AI), cloud, dan desain visual UI/UX.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori sertifikasi"
            className="inline-flex flex-wrap rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900"
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
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {btn.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredCertifications.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Belum ada sertifikat pada kategori ini.
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Pilih kategori lain atau tambahkan data sertifikat baru di{' '}
              <code className="font-mono text-indigo-600 dark:text-indigo-400">
                src/data/portfolio.ts
              </code>
              .
            </p>
            {filter !== 'all' && (
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Tampilkan Semua Sertifikat
              </button>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertifications.map((cert) => (
              <article
                key={cert.id}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-indigo-500/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] font-medium ${
                        cert.category === 'Development'
                          ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                          : 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300'
                      }`}
                    >
                      {cert.category === 'Development' ? 'Software Dev' : 'Desain Grafis'}
                    </span>

                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {cert.year}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-bold leading-snug text-zinc-900 dark:text-zinc-100">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.imageUrl && (
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className="mt-3.5 cursor-pointer overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 transition-all hover:border-indigo-400/80 dark:border-zinc-800 dark:bg-zinc-800/50"
                    >
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    {cert.credentialId ? (
                      <span className="truncate font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        ID: {cert.credentialId}
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex min-h-10 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:border-indigo-400 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                    >
                      Detail Sertifikat
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cert-title"
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {selectedCert.category === 'Development'
                    ? 'Sertifikasi Software Dev'
                    : 'Sertifikasi Desain Grafis'}{' '}
                  • {selectedCert.year}
                </span>
                <h3
                  id="modal-cert-title"
                  className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50"
                >
                  {selectedCert.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Diterbitkan oleh {selectedCert.issuer}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Tutup detail sertifikat"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/70">
              {selectedCert.imageUrl ? (
                <img
                  src={selectedCert.imageUrl}
                  alt={`Sertifikat ${selectedCert.title}`}
                  width={800}
                  height={560}
                  className="aspect-[16/11] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] flex-col justify-between p-6">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-800">
                    <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      CERTIFICATE OF COMPLETION
                    </span>
                    <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {selectedCert.year}
                    </span>
                  </div>

                  <div className="my-auto py-3">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Diberikan kepada
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {portfolioData.profile.name}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedCert.title}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 pt-3 font-mono text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <span>{selectedCert.issuer}</span>
                    {selectedCert.credentialId && <span>ID: {selectedCert.credentialId}</span>}
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {selectedCert.description}
            </p>

            <div className="mt-4">
              <p className="font-mono text-[11px] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                Kompetensi yang Dipelajari
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              {selectedCert.credentialUrl ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Verifikasi Kredensial
                </a>
              ) : (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {selectedCert.isPlaceholder
                    ? 'Data contoh: tambahkan imageUrl atau credentialUrl di src/data/portfolio.ts'
                    : 'Sertifikat terverifikasi'}
                </span>
              )}

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="inline-flex min-h-10 items-center rounded-lg border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

