import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

export function WorkCover({ src, alt }: { src: string; alt: string }) {
  return <Reveal as="figure" className="v2-work-cover" distance={10}><Image src={src} alt={alt} width={1600} height={1000} priority sizes="(max-width: 76rem) 100vw, 76rem" /></Reveal>;
}
