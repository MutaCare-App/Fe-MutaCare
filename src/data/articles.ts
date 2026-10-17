export interface ArticleSection {
  heading?: string;
  body: string;
  bulletPoints?: string[];
  callout?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  reviewer: string;
  summary: string;
  imageUrl: string;
  content: ArticleSection[];
  tags: string[];
}

export interface SupportCard {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  bgGradient: [string, string];
  icon: string;
  iconColor?: string;
  badgeBg?: string;
  badgeText?: string;
  borderColor?: string;
}

export const ARTICLE_CATEGORIES = [
  "Semua",
  "Pengenalan",
  "Gejala & Tanda",
  "Terapi & Penanganan",
  "Dukungan Sekolah",
  "Dukungan Orang Tua",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const SUPPORT_SERVICES: SupportCard[] = [
  {
    id: "panduan-ortu",
    title: "Panduan Orang Tua",
    subtitle: "Langkah mendampingi anak cemas bicara di rumah",
    badge: "Populer",
    bgGradient: ["#FFF1F3", "#FFE4E8"],
    icon: "Heartbeat",
    iconColor: "#E11D48",
    badgeBg: "#FFE4E6",
    badgeText: "#BE123C",
    borderColor: "#FECDD3",
  },
  {
    id: "modul-sekolah",
    title: "Modul Guru & Kelas",
    subtitle: "Strategi komunikasi ramah di lingkungan sekolah",
    badge: "Edukasi",
    bgGradient: ["#F0FDF4", "#DCFCE7"],
    icon: "GraduationCap",
    iconColor: "#059669",
    badgeBg: "#DCFCE7",
    badgeText: "#047857",
    borderColor: "#BBF7D0",
  },
  {
    id: "latihan-bertahap",
    title: "Latihan Bertahap",
    subtitle: "Teknik stimulus fading dan tangga keberanian",
    badge: "Praktik",
    bgGradient: ["#FFFBEB", "#FEF3C7"],
    icon: "Sparkle",
    iconColor: "#D97706",
    badgeBg: "#FEF3C7",
    badgeText: "#B45309",
    borderColor: "#FDE68A",
  },
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "mengenal-selective-mutism",
    title: "Mengenal Selective Mutism: Bukan Sekadar Pemalu Biasa",
    category: "Pengenalan",
    readTime: "5 menit",
    date: "01 Oktober 2026",
    reviewer: "Redaksi MutaCare & Tim Psikolog Klinis",
    summary:
      "Selective mutism adalah gangguan kecemasan sosial kompleks di mana anak tidak mampu berbicara dalam situasi sosial tertentu, meskipun dapat berbicara sangat lancar di lingkungan yang aman seperti di rumah.",
    imageUrl:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
    tags: ["Pengenalan", "Kecemasan Anak", "Selective Mutism"],
    content: [
      {
        heading: "Apa Itu Selective Mutism?",
        body:
          "Banyak orang salah mengira bahwa anak dengan selective mutism (mutisme selektif) bersikap membangkang, sengaja mogok bicara, atau hanya 'sangat pemalu'. Kenyataannya, kondisi ini merupakan gangguan kecemasan masa kanak-kanak yang tercatat secara resmi dalam DSM-5 (Diagnostic and Statistical Manual of Mental Disorders).",
        bulletPoints: [
          "Anak mampu berbicara secara normal dan lancar di lingkungan yang mereka rasa aman (misalnya bersama orang tua di rumah).",
          "Anak mengalami kegagalan konsisten untuk berbicara dalam situasi sosial spesifik di mana ada ekspektasi untuk berbicara (misalnya di sekolah atau tempat umum).",
          "Kondisi ini berlangsung minimal 1 bulan dan tidak terbatas pada bulan pertama masuk sekolah.",
          "Bukan disebabkan oleh kurangnya pengetahuan bahasa atau gangguan komunikasi organik seperti gagap.",
        ],
      },
      {
        heading: "Mengapa Anak 'Membeku' Saat Diminta Bicara?",
        body:
          "Ketika dihadapkan pada situasi sosial yang memicu kecemasan, amigdala (pusat alarm bahaya di otak) mengirimkan sinyal bahaya yang memicu respon 'fight, flight, or freeze'. Pada anak dengan selective mutism, respon yang paling sering terjadi adalah 'freeze' (membeku).",
        callout:
          "Otot pita suara dan tenggorokan anak dapat terasa tegang secara fisik, membuat mereka benar-benar merasa tenggorokan terkunci dan tidak bisa mengeluarkan suara.",
      },
      {
        heading: "Langkah Awal Penanganan yang Tepat",
        body:
          "Kunci utama membantu anak bukanlah dengan memaksa atau mengiming-imingi hadiah untuk berbicara. Pendekatan berbasis empati, menurunkan tekanan verbal, serta konsultasi dini dengan psikolog anak atau terapis wicara terbukti memberikan hasil terbaik.",
      },
    ],
  },
  {
    id: "tanda-tanda-awal-gejala",
    title: "Tanda-Tanda Awal Selective Mutism yang Kerap Luput dari Perhatian",
    category: "Gejala & Tanda",
    readTime: "4 menit",
    date: "28 September 2026",
    reviewer: "Dr. Sp.A, Subsp. Tumbuh Kembang",
    summary:
      "Banyak orang tua mengira anak hanya pendiam atau jago kandang. Padahal, bahasa tubuh kaku dan tatapan menghindar adalah sinyal kuat dari respon kecemasan mendalam.",
    imageUrl:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80",
    tags: ["Gejala", "Deteksi Dini", "Perilaku Anak"],
    content: [
      {
        heading: "Perbedaan Antara Pemalu dan Selective Mutism",
        body:
          "Rasa malu adalah sifat kepribadian yang wajar; anak pemalu biasanya akan mulai hangat dan berbaur setelah beberapa saat (pemanasan). Sebaliknya, anak dengan selective mutism tetap membisu dan tidak mampu bersuara meskipun sudah mengenal teman sekelasnya selama berbulan-bulan.",
      },
      {
        heading: "Sinyal Fisik & Bahasa Tubuh yang Khas",
        body:
          "Gejala selective mutism tidak hanya ketiadaan suara, melainkan melibatkan seluruh bahasa tubuh anak:",
        bulletPoints: [
          "Postur tubuh mematung, kaku, atau bersandar rapat ke tubuh orang tua.",
          "Menghindari kontak mata langsung saat diajak berbicara oleh guru atau orang baru.",
          "Ekspresi wajah datar (mask-like expression) saat merasa menjadi pusat perhatian.",
          "Berkomunikasi hanya melalui gestur non-verbal (mengangguk, menunjuk, atau berbisik ke telinga orang tua).",
        ],
      },
      {
        heading: "Kapan Orang Tua Harus Mulai Waspada?",
        body:
          "Jika anak sudah bersekolah lebih dari 2 bulan namun belum pernah terdengar suaranya oleh guru, atau mengalami kesulitan berinteraksi dengan teman sebaya di luar rumah, jangan tunda untuk melakukan asesmen awal.",
      },
    ],
  },
  {
    id: "stimulus-fading-dan-terapi",
    title: "Teknik Stimulus Fading: Cara Bertahap Melatih Keberanian Bersuara",
    category: "Terapi & Penanganan",
    readTime: "7 menit",
    date: "25 September 2026",
    reviewer: "Tim Terapis Wicara & CBT MutaCare",
    summary:
      "Metode stimulus fading (sliding in) membantu anak menurunkan ambang kecemasan tanpa paksaan, membuka jembatan komunikasi secara perlahan tapi pasti.",
    imageUrl:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&auto=format&fit=crop&q=80",
    tags: ["Terapi", "CBT", "Stimulus Fading"],
    content: [
      {
        heading: "Prinsip Dasar Tangga Keberanian (Bravery Ladder)",
        body:
          "Terapi perilaku kognitif (CBT) untuk selective mutism menggunakan prinsip paparan bertahap (gradual exposure). Anak diajak menapaki 'tangga keberanian' dari level yang paling mudah dan tidak memicu cemas hingga level tantangan yang lebih tinggi.",
        bulletPoints: [
          "Tingkat 1: Mengeluarkan suara non-verbal (tertawa bersama, membuat bunyi hewan dalam permainan).",
          "Tingkat 2: Berbicara dengan orang tua di ruangan kosong di lingkungan sekolah.",
          "Tingkat 3: Memperkenalkan orang ketiga (guru) yang awalnya hanya duduk di kejauhan sambil sibuk dengan aktivitasnya sendiri.",
          "Tingkat 4: Menjawab pertanyaan pilihan terarah (misalnya: 'Mau apel atau pisang?') dengan suara berbisik.",
          "Tingkat 5: Berbicara dengan volume normal dalam kelompok kecil.",
        ],
      },
      {
        heading: "Aturan Emas: Hindari 'Menyelamatkan' Terlalu Cepat",
        body:
          "Orang tua sering kali secara refleks langsung menjawab pertanyaan orang lain atas nama anak. Hal ini disebut 'accidental reinforcement'. Berikan jeda waktu 5-7 detik sebelum merespons agar anak memiliki kesempatan memproses dan mencoba merespons sendiri.",
      },
    ],
  },
  {
    id: "panduan-guru-di-sekolah",
    title: "Panduan untuk Guru: Cara Tepat Merespons Siswa dengan Selective Mutism",
    category: "Dukungan Sekolah",
    readTime: "6 menit",
    date: "20 September 2026",
    reviewer: "Konsultan Pendidikan Inklusif",
    summary:
      "Memaksa siswa berbicara di depan kelas justru memperkuat kecemasan. Pendekatan non-verbal dan pertanyaan terarah terbukti jauh lebih ramah dan efektif.",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80",
    tags: ["Sekolah", "Panduan Guru", "Kelas Inklusif"],
    content: [
      {
        heading: "Ciptakan Lingkungan Kelas yang Aman dan Rendah Tekanan",
        body:
          "Langkah pertama yang paling berdampak adalah memberitahu siswa secara empatik dan empat mata bahwa bapak/ibu guru mengerti bahwa saat ini berbicara terasa sulit bagi mereka, dan mereka tidak akan dipaksa berbicara sampai merasa siap.",
      },
      {
        heading: "Teknik Bertanya yang Membantu",
        body:
          "Ubah cara mengajukan pertanyaan di kelas agar tidak memicu respon membeku:",
        bulletPoints: [
          "Gunakan pertanyaan pilihan terarah: daripada bertanya 'Hari ini mau bermain apa?' (terlalu luas), tanyakan 'Kamu mau mewarnai atau bermain balok?'.",
          "Beri alternatif respon non-verbal: izinkan anak menunjuk gambar, mengacungkan kartu jawaban, atau menggunakan papan tulis mini.",
          "Posisikan anak dengan teman sebaya yang suportif dan tenang, bukan anak yang dominan atau suka menginterupsi.",
        ],
      },
      {
        heading: "Kolaborasi Erat dengan Orang Tua",
        body:
          "Buat jurnal komunikasi harian atau mingguan dengan orang tua untuk memantau kemajuan kecil, seperti anak yang mulai tersenyum, mengangguk, atau berbisik kepada teman sebangkunya.",
      },
    ],
  },
  {
    id: "kesalahan-umum-orang-tua",
    title: "5 Kesalahan Umum Orang Tua Saat Menghadapi Anak Cemas Bicara",
    category: "Dukungan Orang Tua",
    readTime: "5 menit",
    date: "15 September 2026",
    reviewer: "Psikolog Keluarga & Anak",
    summary:
      "Menjadi 'juru bicara' anak memang terasa membantu saat itu juga, namun tanpa disadari dapat menghambat keberanian anak untuk bersuara secara mandiri.",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80",
    tags: ["Orang Tua", "Pola Asuh", "Keluarga"],
    content: [
      {
        heading: "1. Menjadi Juru Bicara Terlalu Cepat",
        body:
          "Ketika tetangga atau kerabat menyapa anak, orang tua kerap langsung menjawab: 'Maaf ya, dia memang pemalu banget.' Kalimat ini memberikan label permanen pada anak dan mengambil alih kesempatan anak untuk mencoba bersuara.",
      },
      {
        heading: "2. Menyogok atau Menghukum untuk Berbicara",
        body:
          "Mengatakan 'Kalau kamu bicara nanti ibu belikan es krim' atau mengancam dengan hukuman tidak akan berhasil. Anak dengan selective mutism bukannya tidak mau berbicara, melainkan benar-benar tidak sanggup akibat respon fobia sosial yang intens.",
      },
      {
        heading: "3. Membandingkan dengan Saudara atau Teman",
        body:
          "Membandingkan: 'Lihat tuh adikmu berani, kamu kok diam terus?' akan semakin meremukkan kepercayaan diri anak dan meningkatkan rasa bersalah atas kondisi yang tidak bisa mereka kendalikan sendiri.",
      },
      {
        heading: "Solusi Positif yang Dianjurkan",
        body:
          "Validasi emosi anak: 'Ibu tahu kamu merasa cemas sekarang, tidak apa-apa. Kita coba pelan-pelan ya.' Pujilah setiap usaha dan keberanian anak, meskipun baru sebatas kontak mata atau lambaian tangan.",
      },
    ],
  },
  {
    id: "latihan-relaksasi-dan-grounding",
    title: "Latihan Pernapasan & Grounding untuk Meredakan Tubuh yang Membeku",
    category: "Terapi & Penanganan",
    readTime: "4 menit",
    date: "10 September 2026",
    reviewer: "Spesialis Manajemen Stres & Relaksasi",
    summary:
      "Ketika anak mengalami kecemasan sosial akut, tubuh masuk ke mode 'freeze'. Latihan pernapasan teratur dan grounding 5-4-3-2-1 membantu mengembalikan rasa aman dan ketenangan fisik.",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    tags: ["Relaksasi", "Grounding", "Ketenangan"],
    content: [
      {
        heading: "Mengapa Tubuh Membutuhkan Relaksasi Somatik?",
        body:
          "Kecemasan bukan hanya ada di pikiran, melainkan tersimpan di dalam tubuh: detak jantung meningkat, pernapasan menjadi dangkal, dan rahang mengunci. Mengatur ritme napas mengirimkan sinyal langsung ke sistem saraf parasimpatis untuk menurunkan mode bahaya.",
      },
      {
        heading: "Latihan Napas Balon Udara (Cocok untuk Anak)",
        body:
          "Ajak anak membayangkan ada balon warna-warni di perutnya:",
        bulletPoints: [
          "Tarik napas perlahan lewat hidung selama 4 detik, rasakan balon mengembang besar.",
          "Tahan napas sejenak selama 2 detik dengan lembut.",
          "Hembuskan perlahan lewat mulut selama 6 detik seperti meniup lilin ulang tahun yang tidak boleh padam.",
          "Ulangi sebanyak 3-5 siklus sebelum memasuki ruangan baru.",
        ],
      },
      {
        heading: "Teknik Grounding 5 Panca Indra",
        body:
          "Saat anak merasa panik di tempat umum, ajak mereka menemukan 5 benda yang bisa dilihat, 4 benda yang bisa disentuh teksturnya, 3 suara yang terdengar, 2 aroma, dan 1 rasa di lidah. Ini mengalihkan fokus dari ketakutan internal kembali ke lingkungan sekitar.",
      },
    ],
  },
];

export function getArticleById(id: string): Article | undefined {
  return ARTICLES_DATA.find((article) => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === "Semua") {
    return ARTICLES_DATA;
  }
  return ARTICLES_DATA.filter((article) => article.category === category);
}

export function searchArticles(query: string, category: string = "Semua"): Article[] {
  const filtered = getArticlesByCategory(category);
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return filtered;

  return filtered.filter(
    (item) =>
      item.title.toLowerCase().includes(trimmed) ||
      item.summary.toLowerCase().includes(trimmed) ||
      item.tags.some((tag) => tag.toLowerCase().includes(trimmed))
  );
}
