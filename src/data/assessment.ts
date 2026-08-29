export interface QuestionItem {
  id: number;
  stage: number;
  stageLabel: string;
  stageStep: number;
  stageTotalSteps: number;
  title: string;
  subtitle?: string;
  type: "checkbox" | "radio";
  maxSelect?: number;
  options: string[];
  buttonText: string;
}

export const ASSESSMENT_QUESTIONS: QuestionItem[] = [
  // --- TAHAP 1: Situasi & Frekuensi Kesulitan Berbicara ---
  {
    id: 1,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Dalam Situasi Apa Kamu Paling Sulit Berbicara?",
    subtitle: "(Pilih Semua Yang Sesuai)",
    type: "checkbox",
    options: [
      "Dengan Guru",
      "Dengan Teman Baru",
      "Dengan Orang Yang Belum Dikenal",
      "Di Depan Kelas",
      "Di Tempat Umum",
      "Situasi Lainnya",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 2,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Dengan Siapa Kamu Merasa Paling Nyaman Berbicara?",
    type: "radio",
    options: [
      "Orang Tua",
      "Saudara",
      "Teman Dekat",
      "Guru",
      "Orang Lain",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 3,
    stage: 1,
    stageLabel: "Tahap 1 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Seberapa Sering Kamu Mengalami Kesulitan Berbicara?",
    type: "radio",
    options: [
      "Tidak Pernah",
      "Jarang",
      "Kadang-Kadang",
      "Sering",
      "Selalu",
    ],
    buttonText: "Lanjut Tahap Berikutnya",
  },

  // --- TAHAP 2: Tingkat Kecemasan & Respon Tubuh ---
  {
    id: 4,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Seberapa Cemas Kamu Ketika Harus Berbicara?",
    type: "radio",
    options: [
      "Sangat Tidak Cemas",
      "Tidak Cemas",
      "Cukup Cemas",
      "Cemas",
      "Sangat Cemas",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 5,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Apa Yang Biasanya Kamu Rasakan Ketika Ingin Berbicara?",
    subtitle: "(Pilih Semua Yang Sesuai)",
    type: "checkbox",
    options: [
      "Jantung Berdebar",
      "Berkeringat",
      "Tangan Gemetar",
      "Sulit Mengeluarkan Suara",
      "Takut Melakukan Kesalahan",
      "Ingin Menghindari Situasi Tersebut",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 6,
    stage: 2,
    stageLabel: "Tahap 2 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Apa Yang Biasanya Kamu Lakukan Saat Merasa Cemas?",
    type: "radio",
    options: [
      "Tetap Mencoba Berbicara",
      "Berbicara Pelan",
      "Mengangguk Atau Menggeleng",
      "Diam",
      "Pergi Dari Situasi Tersebut",
    ],
    buttonText: "Lanjut Tahap Berikutnya",
  },

  // --- TAHAP 3: Tujuan & Preferensi Latihan ---
  {
    id: 7,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 1,
    stageTotalSteps: 3,
    title: "Apa Tujuan Yang Ingin Kamu Capai?",
    subtitle: "(Pilih Maksimal 3)",
    type: "checkbox",
    maxSelect: 3,
    options: [
      "Berani Menyapa Orang Lain",
      "Berani Berbicara Dengan Teman",
      "Berani Menjawab Guru",
      "Berani Berbicara Di Depan Kelas",
      "Lebih Percaya Diri Saat Berbicara",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 8,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 2,
    stageTotalSteps: 3,
    title: "Berapa Lama Kamu Ingin Berlatih Setiap Hari?",
    type: "radio",
    options: [
      "5 Menit",
      "10 Menit",
      "15 Menit",
      "20 Menit",
      "30 Menit",
    ],
    buttonText: "Lanjut",
  },
  {
    id: 9,
    stage: 3,
    stageLabel: "Tahap 3 Dari 3",
    stageStep: 3,
    stageTotalSteps: 3,
    title: "Kapan Kamu Ingin Menerima Pengingat Latihan?",
    type: "radio",
    options: [
      "Pagi",
      "Siang",
      "Sore",
      "Malam",
    ],
    buttonText: "Simpan Asesmen",
  },
];
