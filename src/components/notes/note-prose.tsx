import { WorkProse } from "@/components/works/work-prose";

export function NoteProse({ source }: { source: string }) {
  return <WorkProse source={source} className="v2-note-prose" />;
}
