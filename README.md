# 🌿 MutaCare Mobile App (Frontend)

> **AI Therapy Companion & Graded Exposure System for Selective Mutism**  
> Developed for **PKM-KC 2026**

---

## 📌 About MutaCare Mobile

**MutaCare Mobile** adalah aplikasi pendamping terapi psikologis mandiri berbasis mobile yang dirancang khusus bagi individu yang mengalami **Selective Mutism (Mutisme Selektif)**. 

Aplikasi ini mengintegrasikan prinsip-prinsip klinis **Cognitive Behavioral Therapy (CBT)** dan **Graded Exposure (Eksposur Bertahap)** dengan teknologi kecerdasan buatan (AI) empatik. MutaCare menyediakan ruang virtual yang aman, bertahap, dan bebas dari penghakiman sosial untuk membantu pengguna melatih interaksi suara, merestrukturisasi kecemasan sosial, dan membangun rasa percaya diri secara terukur menuju komunikasi di dunia nyata.

---

## ✨ Fitur-Fitur Utama Aplikasi (Core Features)

MutaCare Frontend menghadirkan pengalaman pengguna (*user journey*) yang komprehensif, empatik, dan mudah diakses:

### 1. 🌟 Onboarding & Psikoedukasi Awal (`/onboarding`)
- **Filosofi Langkah Kecil (*Small Steps*)**: Edukasi interaktif mengenai pentingnya berproses secara perlahan tanpa paksaan.
- **Zona Aman (*Safe & Judgment-Free Space*)**: Penjelasan mengenai keamanan data suara dan lingkungan latihan yang tidak menilai.
- **Navigasi Onboarding Ramah Pengguna**: Tiga tahapan pengenalan visual sebelum memasuki proses autentikasi.

### 2. 🔐 Autentikasi Pengguna & Manajemen Sesi (`/auth`)
- **Registrasi & Login Akun**: Pendaftaran akun aman terintegrasi dengan Supabase Auth & JWT.
- **Validasi Formulir Interaktif**: Validasi email, nama, dan keamanan kata sandi secara *real-time* berbasis skema Zod.
- **Manajemen Token & Sesi**: Penyimpanan sesi berbasis state store Zustand yang efisien untuk otentikasi API.

### 3. 📋 Skrining & Initial Assessment Diagnostik (`/assessment`)
- **Kuesioner Diagnostik Multi-Stage**: 9 pertanyaan terstruktur yang mencakup identifikasi pemicu cemas (*triggers*), respon fisik/emosional, dan target pribadi.
- **Format Jawaban Dinamis**: Mendukung pilihan tunggal (radio), pilihan ganda (checkbox), dan batasan pilihan spesifik.
- **Kalkulasi Tingkat Keparahan & SUDS**: Evaluasi otomatis tingkat keparahan (*mild, moderate, severe*) dan baseline *Subjective Units of Distress Scale* (SUDS).
- **Hasil Rencana Terapi Personal AI**: Visualisasi ringkasan hasil evaluasi awal beserta target mingguan yang disesuaikan secara personal oleh AI.

### 4. 🏠 Therapy Home Dashboard (`/dashboard`)
- **Header Profil & Streak Tracker**: Menampilkan sapaan personal pengguna, avatar, dan pelacak konsistensi latihan harian (*Daily Streak*).
- **Daily Mood Check-in Widget**: Pengecekan suasana hati harian (😊 / 😐 / 😟 / 😢) untuk memantau fluktuasi emosional.
- **Kartu Misi Hari Ini (*Today's Mission Card*)**: Rekomendasi aktivitas harian adaptif (kombinasi relaksasi, latihan eksposur, dan refleksi).
- **Akses Cepat Alat Ketenangan**: Pintasan langsung ke latihan pernapasan cepat saat pengguna merasa cemas.

### 5. 🗺️ Therapy Journey: Graded Exposure Pathway (`/dashboard/journey`)
- **Peta Hierarki Eksposur Bertahap**: Visualisasi jalur terapi mingguan berjenjang, dimulai dari mikro-interaksi (kata tunggal/sapaan) hingga skenario sosial kompleks.
- **State Tahapan Interaktif**: Visualisasi status modul latihan yang jelas (*Selesai / Completed*, *Aktif / In Progress*, dan *Terkunci / Locked*).
- **Modal Detail Misi Harian**: Lembar informasi terperinci mengenai tahapan per hari yang mencakup 3 pilar: *Materi Psikoedukasi*, *Praktik Suara*, dan *Refleksi Sesi*.

### 6. 🎙️ Simulasi Role-Play Virtual & AI Voice Interaction (`/simulation` & `/cbt/simulation`)
- **Latihan Percakapan Suara Nyata**: Pengguna berlatih berbicara langsung menggunakan mikrofon perangkat melalui modul `expo-audio`.
- **Skenario Interaksi Sehari-hari**: Berbagai simulasi situasi sosial realistis (misal: kasir minimarket, menyapa teman sebaya, bertanya di kelas/kampus).
- **Pipeline Suara Terintegrasi**: Rekaman audio dikirimkan ke backend untuk diproses via Google Cloud Speech-to-Text (ASR) dan direspons secara kontekstual oleh LLM Claude 3.5 Sonnet.
- **Umpan Balik & Analisis Performa**: Tinjauan pasca-simulasi yang menyajikan durasi berbicara aktif, evaluasi rasa nyaman, serta umpan balik apresiatif tanpa kritik menghakimi.

### 7. 🧠 CBT Restrukturisasi Kognitif (`/cbt`)
- **Pencatatan Pikiran Otomatis (*Thought Records*)**: Membantu pengguna mengenali pikiran negatif otomatis (*Automatic Negative Thoughts* / ANTs) yang muncul sebelum/saat berbicara.
- **Analisis & Reframing Berbasis AI**: Evaluasi pikiran negatif dan bimbingan untuk membentuk alternatif pikiran yang lebih rasional, adaptif, dan menenangkan.

### 8. 🫁 Relaksasi Somatis & Guided Box Breathing (`/relaxation`)
- **Latihan Pernapasan Terpandu (*Box Breathing 4-4-4-4*)**: Protokol pernapasan tarik-tahan-hembus-tahan dengan animasi visual dan *countdown timer* interaktif.
- **Pilihan Suasana Suara Ambien**: Dukungan audio penenang (hujan, alam, hening) untuk menstabilkan sistem saraf otonom sebelum atau sesudah latihan eksposur.
- **Modal Penyelesaian Sesi**: Rangkuman rasa rileks setelah menyelesaikan latihan pernapasan.

### 9. 📝 Refleksi & Jurnal Pasca-Latihan (`/reflection`)
- **Alur Refleksi Terstruktur 5 Langkah**:
  1. *Pengantar Refleksi*: Menyiapkan fokus kognitif pasca-sesi.
  2. *Evaluasi Suasana Hati*: Menilai kondisi perasaan setelah mencoba berbicara.
  3. *Penandaan Pencapaian Positif (*Achievements*)*: Mengapresiasi keberhasilan kecil (misal: berhasil bersuara, mengendalikan napas).
  4. *Catatan Jurnal Bebas*: Ruang mencurahkan perasaan atau insight baru.
  5. *Rangkuman Selesai*: Konfirmasi penyimpanan jurnal refleksi ke dalam riwayat kemajuan.

### 10. 📊 Pelacak Kemajuan & Gamifikasi (`/dashboard/progress`)
- **Confidence Timeline**: Grafik visual perkembangan rasa percaya diri dari waktu ke waktu.
- **Anxiety Trends Tracker**: Grafik tren penurunan tingkat kecemasan sosial pengguna.
- **Akumulasi Waktu Berbicara (*Speaking Duration Counter*)**: Total detik/menit pengguna aktif mengeluarkan suara dalam simulasi.
- **Sistem Lencana Prestasi (*Milestone Badges*)**:
  - 🌱 *First Voice*: Mengucapkan suara/kata pertama dalam aplikasi.
  - 🌿 *First Conversation*: Menyelesaikan 1 sesi percakapan dua arah penuh.
  - 🌳 *Social Explorer*: Menyelesaikan 5 skenario simulasi berbeda.
  - 🏆 *Public Voice*: Berhasil menyelesaikan simulasi skenario tingkat lanjut.
- **Riwayat Sesi Latihan (*Practice History*)**: Log lengkap seluruh sesi latihan, simulasi, dan jurnal refleksi sebelumnya.

### 11. 👤 Profil & Manajemen Akun (`/dashboard/profile`)
- **Informasi & Edit Akun**: Pengaturan nama panggilan, tanggal lahir, jenis kelamin, dan avatar profil pengguna.
- **Ringkasan Hasil Assessment Awal**: Halaman tinjauan untuk melihat kembali skor diagnosis dan rencana terapi awal.
- **Pengaturan & Logout**: Mekanisme keluar akun yang membersihkan sesi pengguna dengan aman.

---

## 🚀 Tech Stack & Libraries

- **Framework & Core**: [React Native](https://reactnative.dev/) (0.86.3), [React](https://react.dev/) (19.2.3), [Expo SDK 57](https://expo.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation v57)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) & [Tailwind CSS v3](https://tailwindcss.com/)
- **UI Primitives**: Accessible UI Primitives via `@rn-primitives` (Accordion, Alert Dialog, Avatar, Checkbox, Progress, Radio Group, Select, Slot)
- **Iconography**: [Phosphor React Native Icons](https://phosphoricons.com/)
- **State Management**: [Zustand 5](https://zustand-demo.pmnd.rs/)
- **Audio & Media**: `expo-audio`, `expo-image`, `react-native-svg`, `react-native-svg-transformer`
- **Typography**: Bundled Poppins Font Family & Feather Bold
- **Validation**: [Zod](https://zod.dev/)

---

## 📁 Project Structure

Struktur direktori frontend mengikuti arsitektur modular berbasis Expo Router:

```text
Fe-MutaCare/
├── assets/                 # Logo SVG, ilustrasi onboarding, mood icons, dan custom fonts
├── src/
│   ├── app/                # File-based routes (Expo Router)
│   │   ├── _layout.tsx     # Root stack layout (Font loader, Reanimated setup, Global styles)
│   │   ├── index.tsx       # Entry redirect handler
│   │   ├── splash.tsx      # Branded animated splash screen
│   │   ├── onboarding/     # Multi-step onboarding flow
│   │   ├── auth/           # Login & Register screens
│   │   ├── assessment/     # Diagnostic questions & AI therapy plan result
│   │   ├── dashboard/      # Bottom-tab dashboard layout
│   │   │   ├── index.tsx   # Dashboard Home (Streak, Mood, Today's Mission)
│   │   │   ├── journey.tsx # Graded exposure pathway timeline
│   │   │   ├── progress/   # Progress analytics, SUDS trends, badges, history
│   │   │   └── profile/    # User profile, edit account, assessment summary
│   │   ├── simulation/     # Virtual roleplay simulation & feedback
│   │   ├── cbt/            # CBT cognitive restructuring & simulation analysis
│   │   ├── relaxation/     # Guided box breathing session
│   │   └── reflection/     # 5-step post-session reflection journaling
│   ├── components/         # Reusable UI presentation components
│   │   ├── ui/             # Atomic primitive wrappers (Button, Text, Input, Checkbox, Radio, dll.)
│   │   ├── auth/           # Form components for auth
│   │   ├── assessment/     # Question cards, option selectors, stage indicators
│   │   ├── dashboard/      # Home widgets, streak counter, mission cards
│   │   ├── reflection/     # Reflection flow layout and achievement check rows
│   │   └── relaxation/     # Breathing circle animations & controls
│   ├── data/               # Local fallback data (assessment questions, baseline reference)
│   ├── hooks/              # Custom React hooks (useAssessment orchestration, etc.)
│   ├── lib/                # API client (apiFetch, envelope handler), icon utilities, cn helper
│   ├── services/           # Typed API service adapters (Auth, User, Assessment, Mood, Journey, CBT, dll.)
│   ├── store/              # Zustand state stores (Auth, Assessment, Journey, Mood, CBT, Simulation)
│   └── types/              # TypeScript types & API interfaces
├── .env.example            # Template konfigurasi environment variables
├── app.json                # Konfigurasi Expo project & build settings
├── babel.config.js         # Konfigurasi Babel & NativeWind compiler
├── metro.config.js         # Konfigurasi Metro bundler (SVG transformer support)
├── tailwind.config.js      # Definisi tema warna (MutaCare green/mint/amber) & typography
├── tsconfig.json           # Konfigurasi TypeScript compiler
└── package.json            # Daftar dependensi dan scripts
```

---

## 🛠️ Getting Started & Local Development

### Prerequisites

Pastikan Anda telah menginstal:
- **Node.js** (v18.x atau versi LTS terbaru yang disarankan)
- **npm** atau **yarn**
- **Expo Go** (diinstal pada perangkat fisik Android/iOS) atau **Android Studio Emulator** / **Xcode Simulator**
- **EAS CLI** (opsional, jika ingin membuat build APK langsung: `npm install -g eas-cli`)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/MBobyPratama/Fe-MutaCare.git
cd Fe-MutaCare
npm install
```

### 2. Konfigurasi Environment Variables

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan URL backend API di dalam file `.env`:

```env
# URL Backend MutaCare API
EXPO_PUBLIC_API_URL=http://127.0.0.1:5000/api/v1
```

> **Catatan Dynamic Host**: Jika `EXPO_PUBLIC_API_URL` tidak diisi, aplikasi akan secara otomatis menggunakan alamat IP host Metro Anda pada port `5000` (`http://<IP_KOMPUTER_ANDA>:5000/api/v1`) sehingga Anda dapat langsung melakukan pengujian pada perangkat HP fisik yang terhubung ke jaringan Wi-Fi yang sama tanpa perlu mengganti URL secara manual.

### 3. Menjalankan Aplikasi

Jalankan server Metro bundler:

```bash
npm start
```

Pilihan untuk membuka aplikasi:
- **Perangkat Fisik**: Pindai QR Code yang tampil di terminal menggunakan kamera HP (iOS) atau aplikasi **Expo Go** (Android).
- **Android Emulator**: Tekan `a` pada terminal atau jalankan `npm run android`.
- **iOS Simulator**: Tekan `i` pada terminal atau jalankan `npm run ios`.
- **Web Browser**: Tekan `w` pada terminal atau jalankan `npm run web`.

### 4. Membangun File APK (Android Preview Build)

Untuk membuat build APK mandiri menggunakan EAS Build:

```bash
npm run build:apk
```

---

## 🌐 Integrasi dengan Backend MutaCare

Aplikasi Frontend terhubung langsung ke REST API `Be-MutaCare` dengan ketentuan:
- Seluruh permintaan API dipetakan melalui klien seragam di [`src/lib/api.ts`](./src/lib/api.ts).
- Semua respons backend dibungkus dalam format standar envelope JSON:
  ```json
  {
    "success": true,
    "message": "Operation completed successfully",
    "data": { ... }
  }
  ```
- Token autentikasi JWT diinjeksikan secara otomatis pada header `Authorization: Bearer <token>` untuk rute yang dilindungi.
- Penanganan error autentikasi terpusat (otomatis mengarahkan ke halaman login jika sesi berakhir).

---

## 📄 Lisensi & Hak Cipta

Proyek ini dikembangkan sebagai bagian dari Program Kreativitas Mahasiswa Karsa Cipta (**PKM-KC 2026**).  
Seluruh hak cipta dilindungi.

