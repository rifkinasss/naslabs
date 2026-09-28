export type Achievement = {
  year: number;
  placement: string;
  event: string;
  category?: string;
  team?: string;
  role?: string;
  format?: string;
  context?: string;
  project?: string;
  institution?: string;
};

type LocalizedAchievement = {
  year: number;
  en: Omit<Achievement, "year">;
  id: Omit<Achievement, "year">;
};

const achievements: LocalizedAchievement[] = [
  {
    year: 2026,
    en: {
      placement: "3rd Place",
      event: "Kideco Innovation Challenge 2026",
      category: "Hackathon",
      team: "First Time Hackathon",
      role: "Full-Stack Web Developer · IoT Developer",
      format: "12-hour onsite hackathon",
      context: "Digitalization of fuel ratio monitoring",
    },
    id: {
      placement: "Juara 3",
      event: "Kideco Innovation Challenge 2026",
      category: "Hackathon",
      team: "First Time Hackathon",
      role: "Full-Stack Web Developer · IoT Developer",
      format: "Hackathon onsite 12 jam",
      context: "Digitalisasi pemantauan rasio bahan bakar",
    },
  },
  {
    year: 2025,
    en: {
      placement: "1st Place",
      event: "KRENOVA Balikpapan 2025",
      category: "Student",
      project: "Tanamin Bumi",
    },
    id: {
      placement: "Juara 1",
      event: "KRENOVA Balikpapan 2025",
      category: "Kategori Mahasiswa",
      project: "Tanamin Bumi",
    },
  },
  {
    year: 2024,
    en: {
      placement: "1st Place",
      event: "UI/UX Competition",
      category: "MIT Week 2024",
      institution: "Universitas Mulawarman",
    },
    id: {
      placement: "Juara 1",
      event: "UI/UX Competition",
      category: "MIT Week 2024",
      institution: "Universitas Mulawarman",
    },
  },
];

export function getAchievements(locale: "en" | "id"): Achievement[] {
  return achievements.map(({ year, ...localized }) => ({
    year,
    ...localized[locale],
  }));
}
