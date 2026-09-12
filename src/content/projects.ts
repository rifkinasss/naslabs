export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  role: string;
  stack: string[];
  image?: string;
  access: {
    visibility: "public" | "private";
    url?: string;
  };
  sections: Array<{ title: string; body: string }>;
};

export const projects: Project[] = [
  {
    slug: "pondflow",
    title: "PondFlow",
    category: "Web app · Aquaculture operations",
    summary:
      "A practical platform for fish farmers to track pond cycles, costs, and harvest performance.",
    context:
      "A self-hosted financial and operations platform for fish farming businesses that need clearer records across ponds, cycles, and day-to-day decisions.",
    role: "Product design, full-stack development, data modeling, and mobile application implementation.",
    stack: [
      "Next.js",
      "TypeScript",
      "SQLite",
      "Google Gemini",
      "Capacitor",
      "REST API",
    ],
    image: "/projects/pondflow-hero.png",
    access: { visibility: "public", url: "https://pondflow.naslabs.my.id" },
    sections: [
      {
        title: "The challenge",
        body: "Fish farming operations generate important numbers every day, but those numbers are often spread across notes, spreadsheets, and memory. PondFlow needed to make recording costs and pond activity simple enough for the field while keeping the resulting business picture clear.",
      },
      {
        title: "The platform",
        body: "PondFlow brings pond management, financial records, production cycles, and harvest analysis into one workspace. Structured entries turn daily activity into useful metrics such as cost of goods, margin, FCR, and performance trends.",
      },
      {
        title: "The experience",
        body: "The responsive web app is designed for practical use across desktop and mobile, with PWA and Android support. A focused dashboard gives operators a quick view of active ponds, current cycles, business performance, and the next decision to make.",
      },
    ],
  },
  {
    slug: "tanamin-bumi",
    title: "Tanamin Bumi",
    category: "Web platform · Environmental action",
    summary:
      "A digital platform for environmental programs, tree planting campaigns, donations, and transparent impact tracking.",
    context:
      "A public-facing platform connecting people and organizations with reforestation and environmental initiatives across Indonesia.",
    role: "Web development, product implementation, and interface engineering.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "PostgreSQL",
      "REST API",
    ],
    image: "/projects/tanaminbumi-hero.png",
    access: { visibility: "public", url: "https://tanaminbumi.com" },
    sections: [
      {
        title: "The challenge",
        body: "Environmental action needs more than a campaign message. People need a clear way to discover programs, understand where an action happens, and see how their contribution connects to a wider impact.",
      },
      {
        title: "The platform",
        body: "Tanamin Bumi brings campaigns, donation flows, planting locations, stories, and environmental programs into one public-facing experience. The interface keeps the action visible while giving partner organizations room to communicate their work.",
      },
      {
        title: "The experience",
        body: "The homepage leads with a clear invitation to join the movement, supported by campaign cards, impact areas, partner information, and an interactive program map. The structure is designed to make discovery and participation feel approachable.",
      },
    ],
  },
  {
    slug: "cloud",
    title: "Cloud",
    category: "Internal platform · File management",
    summary:
      "A private cloud storage module that helps teams organize, access, and manage files securely from the browser.",
    context:
      "An internal storage platform for NasLabs, built as an extension of an existing Laravel system with shared authentication and user management.",
    role: "Product implementation, frontend engineering, API integration, and storage workflow development.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "shadcn/ui",
      "Laravel",
      "PostgreSQL",
      "REST API",
    ],
    image: "/projects/cloud-hero.png",
    access: { visibility: "private" },
    sections: [
      {
        title: "The challenge",
        body: "Teams need a dependable place for working files, but shared folders and ad-hoc storage quickly make ownership, access, and storage usage difficult to manage. The platform needed to feel familiar while respecting the security requirements of an internal system.",
      },
      {
        title: "The platform",
        body: "Cloud provides a focused drive experience for uploading and downloading files, creating nested folders, searching by name, and moving items through a clear browser-based workspace. A trash flow supports restore and permanent deletion without making everyday file management feel heavy.",
      },
      {
        title: "The system",
        body: "The module extends an existing Laravel application instead of introducing a separate identity system. Session-based authentication, user-owned storage, configurable quotas, protected file access, and activity logs keep the experience connected to the organization’s existing operational foundation.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

const indonesianProjectText: Record<string, Pick<Project, "category" | "summary" | "context" | "role" | "sections">> = {
  pondflow: { category: "Aplikasi web · Operasional akuakultur", summary: "Platform praktis bagi pembudidaya ikan untuk memantau siklus kolam, biaya, dan performa panen.", context: "Platform finansial dan operasional self-hosted untuk bisnis budidaya ikan yang membutuhkan pencatatan lebih jelas di seluruh kolam, siklus, dan keputusan harian.", role: "Desain produk, pengembangan full-stack, pemodelan data, dan implementasi aplikasi mobile.", sections: [{ title: "Tantangan", body: "Operasional budidaya ikan menghasilkan banyak angka penting setiap hari, tetapi sering tersebar di catatan, spreadsheet, dan ingatan. PondFlow perlu membuat pencatatan biaya dan aktivitas kolam cukup sederhana untuk digunakan di lapangan, sekaligus menjaga gambaran bisnis tetap jelas." }, { title: "Platform", body: "PondFlow menyatukan pengelolaan kolam, catatan keuangan, siklus produksi, dan analisis panen dalam satu ruang kerja. Data yang terstruktur mengubah aktivitas harian menjadi metrik seperti harga pokok, margin, FCR, dan tren performa." }, { title: "Pengalaman", body: "Aplikasi web responsif ini dirancang untuk penggunaan desktop dan mobile, dengan dukungan PWA dan Android. Dashboard yang fokus memberi operator gambaran cepat tentang kolam aktif, siklus berjalan, performa bisnis, dan keputusan berikutnya." }] },
  "tanamin-bumi": { category: "Platform web · Aksi lingkungan", summary: "Platform digital untuk program lingkungan, kampanye penanaman pohon, donasi, dan pelacakan dampak yang transparan.", context: "Platform publik yang menghubungkan masyarakat dan organisasi dengan inisiatif penghijauan serta lingkungan di seluruh Indonesia.", role: "Pengembangan web, implementasi produk, dan engineering antarmuka.", sections: [{ title: "Tantangan", body: "Aksi lingkungan membutuhkan lebih dari sekadar pesan kampanye. Masyarakat perlu cara yang jelas untuk menemukan program, memahami lokasi aksi, dan melihat hubungan kontribusi mereka dengan dampak yang lebih luas." }, { title: "Platform", body: "Tanamin Bumi menyatukan kampanye, alur donasi, lokasi penanaman, cerita, dan program lingkungan dalam satu pengalaman publik. Antarmukanya membuat aksi tetap terlihat sekaligus memberi ruang bagi organisasi mitra untuk menyampaikan pekerjaan mereka." }, { title: "Pengalaman", body: "Homepage dibuka dengan ajakan yang jelas untuk ikut bergerak, didukung kartu kampanye, area dampak, informasi mitra, dan peta program interaktif. Strukturnya membuat proses menemukan program dan berpartisipasi terasa mudah didekati." }] },
  cloud: { category: "Platform internal · Manajemen file", summary: "Modul penyimpanan cloud privat yang membantu tim mengatur, mengakses, dan mengelola file dengan aman dari browser.", context: "Platform penyimpanan internal untuk NasLabs yang dibangun sebagai pengembangan dari sistem Laravel yang sudah ada, dengan autentikasi dan manajemen pengguna bersama.", role: "Implementasi produk, engineering frontend, integrasi API, dan pengembangan alur penyimpanan.", sections: [{ title: "Tantangan", body: "Tim membutuhkan tempat yang dapat diandalkan untuk file kerja, tetapi folder bersama dan penyimpanan ad-hoc dengan cepat membuat kepemilikan, akses, dan penggunaan storage sulit dikelola. Platform ini perlu terasa familiar sekaligus memenuhi kebutuhan keamanan sistem internal." }, { title: "Platform", body: "Cloud menyediakan pengalaman drive yang fokus untuk upload dan download file, membuat folder bertingkat, mencari berdasarkan nama, serta memindahkan item melalui ruang kerja berbasis browser yang jelas. Alur trash mendukung pemulihan dan penghapusan permanen tanpa membuat pengelolaan file sehari-hari terasa berat." }, { title: "Sistem", body: "Modul ini memperluas aplikasi Laravel yang sudah ada tanpa memperkenalkan sistem identitas terpisah. Autentikasi berbasis session, storage milik pengguna, kuota yang dapat dikonfigurasi, akses file terlindungi, dan activity log menjaga pengalaman tetap terhubung dengan fondasi operasional organisasi." }] }
};

export function getProjects(locale = "en") {
  if (locale !== "id") return projects;
  return projects.map((project) => ({ ...project, ...indonesianProjectText[project.slug] }));
}

export function getLocalizedProject(slug: string, locale = "en") {
  return getProjects(locale).find((project) => project.slug === slug);
}
