export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  role: string;
  stack: string[];
  image?: string;
  sections: Array<{ title: string; body: string }>;
};

export const projects: Project[] = [
  {
    slug: "tanamin-bumi",
    title: "Tanamin Bumi",
    category: "Web platform · Environmental action",
    summary: "A digital platform for environmental programs, tree planting campaigns, donations, and transparent impact tracking.",
    context: "A public-facing platform connecting people and organizations with reforestation and environmental initiatives across Indonesia.",
    role: "Web development, product implementation, and interface engineering.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "PostgreSQL", "REST API"],
    image: "/projects/tanaminbumi-hero.png",
    sections: [
      { title: "The challenge", body: "Environmental action needs more than a campaign message. People need a clear way to discover programs, understand where an action happens, and see how their contribution connects to a wider impact." },
      { title: "The platform", body: "Tanamin Bumi brings campaigns, donation flows, planting locations, stories, and environmental programs into one public-facing experience. The interface keeps the action visible while giving partner organizations room to communicate their work." },
      { title: "The experience", body: "The homepage leads with a clear invitation to join the movement, supported by campaign cards, impact areas, partner information, and an interactive program map. The structure is designed to make discovery and participation feel approachable." },
    ],
  },
  {
    slug: "cloud",
    title: "Cloud",
    category: "Internal platform · File management",
    summary: "A private cloud storage module that helps teams organize, access, and manage files securely from the browser.",
    context: "An internal storage platform for NasLabs, built as an extension of an existing Laravel system with shared authentication and user management.",
    role: "Product implementation, frontend engineering, API integration, and storage workflow development.",
    stack: ["Next.js", "React", "TypeScript", "shadcn/ui", "Laravel", "PostgreSQL", "REST API"],
    image: "/projects/cloud-hero.png",
    sections: [
      { title: "The challenge", body: "Teams need a dependable place for working files, but shared folders and ad-hoc storage quickly make ownership, access, and storage usage difficult to manage. The platform needed to feel familiar while respecting the security requirements of an internal system." },
      { title: "The platform", body: "Cloud provides a focused drive experience for uploading and downloading files, creating nested folders, searching by name, and moving items through a clear browser-based workspace. A trash flow supports restore and permanent deletion without making everyday file management feel heavy." },
      { title: "The system", body: "The module extends an existing Laravel application instead of introducing a separate identity system. Session-based authentication, user-owned storage, configurable quotas, protected file access, and activity logs keep the experience connected to the organization’s existing operational foundation." },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
