export type ProjectCategory = 'dev' | 'design';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  /** Opsional: isi dengan path gambar di folder public/, misal '/images/project-1.png' */
  imageUrl?: string;
  /** Tema visual kartu saat belum ada gambar asli */
  previewTheme: 'indigo' | 'emerald' | 'amber' | 'rose' | 'cyan' | 'violet';
  previewLabel: string;
  liveUrl?: string;
  repoUrl?: string;
  designUrl?: string;
}

export interface ExperienceItem {
  id: string;
  category: 'organisasi' | 'project';
  role: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Development' | 'Design';
  credentialId?: string;
  /** Opsional: link verifikasi kredensial atau file PDF/sertifikat */
  credentialUrl?: string;
  /** Opsional: gambar sertifikat di folder public/, misal '/certificates/sertifikat-1.jpg' */
  imageUrl?: string;
  description: string;
  skills: string[];
  /** Penanda data contoh agar transparan sebelum diganti data asli */
  isPlaceholder?: boolean;
}

export const portfolioData = {
  profile: {
    name: 'Fahmi Ghozali',
    initials: 'FG',
    tagline: 'Software Dev & Desain Grafis',
    availability: 'Tersedia untuk proyek freelance & kolaborasi',
    location: 'Indonesia',
    heroDescription:
      'Membangun website, terstruktur, dan responsif sekaligus merancang karya desain grafis yang tajam, komunikatif, dan menarik.',
    aboutParagraphs: [
      'Saya Fahmi Ghozali, seorang Software Developer dan Desainer Grafis yang percaya bahwa produk digital terbaik lahir dari perpaduan logika kode yang rapi dan kekuatan komunikasi visual.',
      'Di sisi pengembangan perangkat lunak, saya terbiasa membangun antarmuka web modern dan sistem yang efisien. Di sisi desain grafis, saya merancang materi promosi bisnis, branding visual, flyer acara, hingga publikasi media sosial dengan hierarki visual yang jelas.',
    ],
    email: 'fahmighozali740@gmail.com',
    socials: {
      github: 'https://github.com/fahmigh16',
      githubHandle: 'fahmigh16',
      linkedin:
        'https://www.linkedin.com/in/fahmi-ghozali-318086380?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      linkedinHandle: 'Fahmi Ghozali',
      instagram: 'https://instagram.com/fhmigh_',
      instagramHandle: '@fhmigh_',
    },
  },

  skills: {
    development: [
      'Next.js & React',
      'TypeScript & JavaScript',
      'Tailwind CSS',
      'Node.js & REST API',
      'Database SQL & Relasional',
      'AI Agent & LLM Integration',
      'Web Security (IDOR, XSS)',
      'Git & GitHub',
      'Responsive Web Design',
    ],
    design: [
      'Desain Grafis & Materi Promosi',
      'Poster, Banner & Feed Media Sosial',
      'Visual Hierarchy & Layouting',
      'Tipografi & Pemilihan Warna',
      'Konten Feed & Story Instagram',
    ],
  },

  // Karya & Proyek nyata Fahmi Ghozali disesuaikan dengan repositori GitHub & Portofolio
  projects: [
    {
      id: 'dev-lentera-dahayu',
      title: 'Lentera Dahayu Platform',
      category: 'dev',
      year: '2026',
      summary:
        'Aplikasi web modern berbasis Next.js, TypeScript, dan Tailwind CSS untuk ekosistem platform edukasi & profil Lentera Dahayu.',
      description:
        'Platform web komprehensif yang dirancang untuk menyajikan layanan, profil program, dan antarmuka interaktif dengan performa tinggi dan tampilan responsif.',
      challenge:
        'Membangun struktur web yang fleksibel, cepat diakses, serta ramah pengguna di desktop maupun mobile menggunakan Next.js App Router.',
      solution:
        'Mengimplementasikan arsitektur komponen React/Next.js modular dengan Tailwind CSS, optimasi aset, dan pemisahan data logic yang rapi.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full Stack'],
      previewTheme: 'indigo',
      previewLabel: 'NEXT.JS WEB APP',
      repoUrl: 'https://github.com/fahmigh16/lentera-dahayu',
      liveUrl: 'https://github.com/fahmigh16/lentera-dahayu',
    },
    {
      id: 'dev-labcare-ai',
      title: 'LabCare AI Agent (Sistem Pengaduan Kampus)',
      category: 'dev',
      year: '2025',
      summary:
        'Backend pelaporan fasilitas laboratorium kampus terintegrasi dengan chatbot AI, retry logic, dan database sesi percakapan.',
      description:
        'Sistem pengaduan fasilitas kampus otomatis yang memanfaatkan kecerdasan buatan (LLM) untuk mengidentifikasi kategori keluhan, mencatat tiket masalah, dan memberikan balasan cerdas real-time.',
      challenge:
        'Laporan keluhan fasilitas kampus sering masuk secara tidak terstruktur sehingga memperlambat admin teknisi dalam menentukan prioritas perbaikan.',
      solution:
        'Membangun backend Node.js terintegrasi LLM router, retry mechanism, dan database relasional SQL untuk menyimpan sesi obrolan serta status tiket penanganan.',
      tags: ['Node.js', 'SQL', 'LLM AI Agent', 'REST API', 'API Testing'],
      previewTheme: 'violet',
      previewLabel: 'AI AGENT & BACKEND',
      repoUrl: 'https://github.com/fahmigh16/LabCare-Sistem-Pengaduan',
      liveUrl: 'https://github.com/fahmigh16/LabCare-Sistem-Pengaduan',
    },
    {
      id: 'dev-portal-kampus',
      title: 'Portal Kampus Rentan (Security Simulation)',
      category: 'dev',
      year: '2024',
      summary:
        'Simulasi portal akademik kampus dengan kerentanan keamanan web (IDOR & Stored XSS) untuk riset pengujian penetrasi.',
      description:
        'Aplikasi web yang sengaja dirancang memuat celah keamanan web seperti Insecure Direct Object References (IDOR) dan Stored Cross-Site Scripting (XSS) sebagai sarana demonstrasi edukasi dan pengujian keamanan siber.',
      challenge:
        'Meniru alur portal akademik mahasiswa yang realistis sekaligus menyimulasikan kerentanan otorisasi dan sanitasi input yang dapat dieksploitasi dan dimitigasi.',
      solution:
        'Mengembangkan web interaktif dengan alur peran mahasiswa/dosen dan menyajikan skenario mitigasi penanganan celah keamanan siber.',
      tags: ['HTML/JS', 'Web Security', 'IDOR', 'Stored XSS', 'Cybersecurity'],
      previewTheme: 'emerald',
      previewLabel: 'SECURITY SIMULATION',
      repoUrl: 'https://github.com/fahmigh16/portal-kampus',
      liveUrl: 'https://portal-kampusrentan.netlify.app',
    },
    {
      id: 'dev-kunjungan-edukasi',
      title: 'Sistem Informasi Kunjungan Edukasi',
      category: 'dev',
      year: '2024',
      summary:
        'Sistem informasi manajemen kunjungan edukasi kampus, berfokus pada arsitektur backend dan skema database relasional.',
      description:
        'Proyek kolaborasi tim kampus untuk memfasilitasi sekolah dan instansi luar dalam mengajukan perizinan, penjadwalan, dan pencatatan riwayat kunjungan edukasi ke kampus.',
      challenge:
        'Pengelolaan jadwal kunjungan yang bentrok dan proses persetujuan birokrasi manual yang memakan waktu.',
      solution:
        'Merancang skema database terstruktur, endpoint API pengelolaan jadwal, serta alur approval berbasis status verifikasi.',
      tags: ['JavaScript', 'Backend', 'Database Architecture', 'Team Project'],
      previewTheme: 'cyan',
      previewLabel: 'CAMPUS INFORMATION SYSTEM',
      repoUrl: 'https://github.com/fahmigh16/KunjunganEdukasi',
      liveUrl: 'https://github.com/fahmigh16/KunjunganEdukasi',
    },
    {
      id: 'dev-carimakan-app',
      title: 'CariMakan App',
      category: 'dev',
      year: '2024',
      summary:
        'Aplikasi web pencarian dan rekomendasi tempat makan lokal dengan antarmuka cepat, responsif, dan mudah digunakan.',
      description:
        'Web app berbasis JavaScript untuk memudahkan pengguna menemukan pilihan kuliner terdekat berdasarkan kategori menu, rentang harga, dan ulasan.',
      challenge:
        'Membuat pencarian kuliner yang cepat dan ramah diakses lewat smartphone tanpa latency tinggi.',
      solution:
        'Implementasi manipulasi DOM efisien, filtering data dinamis, dan layout responsif CSS mobile-first.',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Web'],
      previewTheme: 'amber',
      previewLabel: 'FOOD DISCOVERY APP',
      repoUrl: 'https://github.com/fahmigh16/carimakan-app',
      liveUrl: 'https://github.com/fahmigh16/carimakan-app',
    },
  ] as Project[],

  // Daftar sertifikat asli Fahmi Ghozali
  certifications: [
    {
      id: 'cert-1',
      title: 'Back-End Pemula dengan JavaScript',
      issuer: 'Dicoding Indonesia',
      year: '2024',
      category: 'Development',
      credentialId: 'DICODING-BACKEND-JS',
      credentialUrl: '/certificates/dicoding-backend-pemula-js.pdf',
      imageUrl: '/certificates/dicoding-backend-pemula-js.png',
      description:
        'Membangun REST API menggunakan Node.js dan Hapi framework, routing request, response handling, validasi data, dan testing API dengan Postman.',
      skills: ['Node.js', 'Hapi.js', 'REST API', 'Postman'],
      isPlaceholder: false,
    },
    {
      id: 'cert-2',
      title: 'Kompetisi UI/UX Design ITechno Cup',
      issuer: 'ITechno Cup',
      year: '2026',
      category: 'Design',
      credentialId: 'ITECHNO-UIUX-2026',
      credentialUrl: '/certificates/itechno-cup-2026-uiux.pdf',
      imageUrl: '/certificates/itechno-cup-2026-uiux.png',
      description:
        'Perancangan antarmuka visual (UI) dan alur pengalaman pengguna (UX) aplikasi digital inovatif yang komunikatif, estetis, dan fungsional.',
      skills: ['UI/UX Design', 'Visual Hierarchy', 'Wireframing', 'Prototyping'],
      isPlaceholder: false,
    },
    {
      id: 'cert-3',
      title: 'Dasar Pemrograman JavaScript',
      issuer: 'Dicoding Indonesia',
      year: '2024',
      category: 'Development',
      credentialId: 'DICODING-DASAR-JS',
      credentialUrl: '/certificates/dicoding-dasar-js.pdf',
      imageUrl: '/certificates/dicoding-dasar-js.png',
      description:
        'Fundamental bahasa pemrograman JavaScript modern (ES6+), struktur data array/object, OOP, dan asynchronous programming (Promise & async/await).',
      skills: ['JavaScript ES6+', 'OOP', 'Asynchronous', 'Functional Programming'],
      isPlaceholder: false,
    },
    {
      id: 'cert-4',
      title: 'AI Agents & Autonomous Systems',
      issuer: 'IBM SkillsBuild',
      year: '2024',
      category: 'Development',
      credentialId: 'IBM-AI-AGENTS',
      credentialUrl: '/certificates/ibm-ai-agents.pdf',
      imageUrl: '/certificates/ibm-ai-agents.png',
      description:
        'Konsep perancangan agen kecerdasan buatan otonom, workflow automasi modern, dan interaksi cerdas berbasis model bahasa.',
      skills: ['AI Agents', 'Automation', 'IBM SkillsBuild'],
      isPlaceholder: false,
    },
    {
      id: 'cert-5',
      title: 'Code Generation with IBM Granite',
      issuer: 'IBM SkillsBuild',
      year: '2024',
      category: 'Development',
      credentialId: 'IBM-GRANITE-CODE',
      credentialUrl: '/certificates/ibm-code-generation-granite.pdf',
      imageUrl: '/certificates/ibm-code-generation-granite.png',
      description:
        'Implementasi model AI IBM Granite untuk percepatan sintesis kode software, debugging terstruktur, dan refactoring aplikasi.',
      skills: ['IBM Granite', 'Code Generation', 'Software Dev'],
      isPlaceholder: false,
    },
    {
      id: 'cert-6',
      title: 'Cloud & Generative AI AWS',
      issuer: 'Dicoding Indonesia & AWS',
      year: '2024',
      category: 'Development',
      credentialId: 'DICODING-AWS-GENAI',
      credentialUrl: '/certificates/dicoding-cloud-genai-aws.pdf',
      imageUrl: '/certificates/dicoding-cloud-genai-aws.png',
      description:
        'Infrastruktur Cloud Computing AWS, konsep dasar container, dan pemanfaatan fondasi Generative AI untuk solusi komputasi cerdas.',
      skills: ['AWS Cloud', 'Generative AI', 'Cloud Computing'],
      isPlaceholder: false,
    },
    {
      id: 'cert-7',
      title: 'Belajar Dasar AI (Artificial Intelligence)',
      issuer: 'Dicoding Indonesia',
      year: '2024',
      category: 'Development',
      credentialId: 'DICODING-DASAR-AI',
      credentialUrl: '/certificates/dicoding-dasar-ai.pdf',
      imageUrl: '/certificates/dicoding-dasar-ai.png',
      description:
        'Pengenalan ekosistem Artificial Intelligence, Machine Learning, Deep Learning, serta etika dan penerapan AI di industri digital.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Data Ethics'],
      isPlaceholder: false,
    },
    {
      id: 'cert-8',
      title: 'Getting Started with Data',
      issuer: 'IBM SkillsBuild',
      year: '2024',
      category: 'Development',
      credentialId: 'IBM-DATA-START',
      credentialUrl: '/certificates/ibm-getting-started-with-data.pdf',
      imageUrl: '/certificates/ibm-getting-started-with-data.png',
      description:
        'Prinsip analisis data, interpretasi visual grafik, pembersihan dataset, dan pemahaman siklus hidup data dalam pengambilan keputusan.',
      skills: ['Data Analysis', 'Data Visualization', 'IBM SkillsBuild'],
      isPlaceholder: false,
    },
  ] as CertificationItem[],

  // Pengalaman terbagi menjadi Berorganisasi dan Project (diambil dari data PORTOFOLIO)
  experience: [
    {
      id: 'org-hmj-ti',
      category: 'organisasi',
      role: 'Kepala Departemen Media dan Informasi (Kabinet Sankara)',
      organization: 'HMJ TI (Himpunan Mahasiswa Jurusan TI) – Politeknik Negeri Lampung',
      period: '2024 – Sekarang',
      type: 'Organisasi',
      description:
        'Memimpin dan mengoordinasikan tim divisi Media & Informasi dalam pengelolaan komunikasi digital, publikasi berita/kegiatan jurusan, serta pemeliharaan aset media dan dokumentasi teknis (sebelumnya menjabat sebagai Staff Ahli Medinfo Kabinet Nantera).',
      highlights: [
        'Memimpin 10+ anggota dalam merancang strategi publikasi teknis dan informasi publik jurusan.',
        'Menyederhanakan alur kerja penyampaian berita dan dokumentasi kegiatan secara digital.',
        'Mengelola pemeliharaan aset grafis resmi dan kanal informasi digital jurusan.',
      ],
    },
    {
      id: 'org-hima-pointer',
      category: 'organisasi',
      role: 'Wakil Ketua Divisi Media dan Informasi',
      organization: 'HIMA POINTER (Himpunan Mahasiswa Manajemen Informatika) – Politeknik Negeri Lampung',
      period: '2024 – Sekarang',
      type: 'Organisasi',
      description:
        'Mengoordinasikan tim lintas fungsi untuk pemeliharaan aset digital, publikasi kegiatan program studi, dan distribusi informasi kepada seluruh mahasiswa (sebelumnya Anggota Divisi Media & Informasi).',
      highlights: [
        'Mengoordinasikan tim kreatif dalam perancangan konten visual dan publikasi media sosial program studi.',
        'Menjaga konsistensi identitas visual dan kelancaran distribusi informasi kegiatan kemahasiswaan.',
      ],
    },
    {
      id: 'proj-1',
      category: 'project',
      role: 'Freelance Software Developer & Graphic Designer',
      organization: 'Proyek Independen / Klien UMKM & Komunitas',
      period: '2025 – Sekarang',
      type: 'Hybrid',
      description:
        'Mengerjakan pengembangan website profil usaha, aplikasi web skala kecil-menengah, serta kebutuhan desain grafis dan promosi produk.',
      highlights: [
        'Membangun antarmuka web responsif menggunakan React dan Tailwind CSS.',
        'Merancang materi visual promosi digital & cetak untuk kampanye usaha dan acara.',
        'Berkolaborasi langsung dengan klien mulai dari konsep visual hingga implementasi akhir.',
      ],
    },
    {
      id: 'proj-2',
      category: 'project',
      role: 'Front-End Developer (Proyek Akademik / Tim)',
      organization: 'Pengembangan Aplikasi Web',
      period: '2024 – 2025',
      type: 'Development',
      description:
        'Berperan dalam merancang struktur komponen UI, integrasi data API, dan memastikan tampilan aplikasi konsisten di berbagai ukuran layar.',
      highlights: [
        'Mengubah rancangan wireframe menjadi komponen React yang reusable.',
        'Menjaga kebersihan kode dengan TypeScript dan manajemen versi Git.',
      ],
    },
    {
      id: 'proj-3',
      category: 'project',
      role: 'Desainer Grafis & Publikasi Acara',
      organization: 'Organisasi & Kepanitiaan Event',
      period: '2023 – 2024',
      type: 'Design',
      description:
        'Bertanggung jawab atas identitas visual acara, pembuatan poster pengumuman, materi pembicara, dan publikasi media sosial.',
      highlights: [
        'Menghasilkan puluhan aset desain visual dan banner yang konsisten secara brand.',
        'Memastikan seluruh aset siap digunakan baik untuk format digital maupun cetak.',
      ],
    },
  ] as ExperienceItem[],
};

