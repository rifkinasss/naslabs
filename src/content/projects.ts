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
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
