"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";

import { Link } from "@/i18n/navigation";
import type { Work } from "@/lib/content/contracts";

type FeaturedWorksCarouselProps = {
  works: Work[];
  labels: {
    region: string;
    previous: string;
    next: string;
    position: string;
    readMore: string;
  };
};

export function FeaturedWorksCarousel({ works, labels }: FeaturedWorksCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const total = works.length;

  const changeSlide = (nextIndex: number, nextDirection: "next" | "previous") => {
    setDirection(nextDirection);
    setActiveIndex((nextIndex + total) % total);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false || isHovered || isFocused || !isVisible || total < 2) return;
    const timeout = window.setTimeout(() => {
      setDirection("next");
      setActiveIndex((index) => (index + 1) % total);
    }, 6000);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, isFocused, isHovered, isVisible, reducedMotion, total]);

  if (!total) return null;

  const activeWork = works[activeIndex];

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeSlide(activeIndex - 1, "previous");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeSlide(activeIndex + 1, "next");
    }
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocused(false);
  };

  const supportsHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const handleMouseEnter = () => { if (supportsHover()) setIsHovered(true); };
  const handleMouseLeave = () => { if (supportsHover()) setIsHovered(false); };

  return (
    <div className="v2-home__featured-showcase" role="region" aria-roledescription="carousel" aria-label={labels.region} tabIndex={0} onKeyDown={handleKeyDown} onFocus={() => setIsFocused(true)} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <article className={`v2-home__featured-slide v2-home__featured-slide--${direction} v2-home__featured-slide--${activeIndex % 2 === 0 ? "image-first" : "content-first"}`} key={activeWork.slug} aria-roledescription="slide" aria-label={`${activeIndex + 1} / ${total}`}>
        <span className="v2-home__featured-index">{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="v2-home__featured-image-wrap">
          <Image className="v2-home__featured-image" src={activeWork.cover} alt={`${activeWork.title} project`} width={1555} height={1012} sizes="(max-width: 1023px) 100vw, 58vw" priority={activeIndex === 0} />
        </div>
        <div className="v2-home__featured-content">
          <p className="v2-label v2-home__featured-category">{activeWork.category}</p>
          <h3 className="v2-h3">{activeWork.title}</h3>
          <p className="v2-body-sm v2-home__featured-description">{activeWork.description}</p>
          <div className="v2-home__featured-meta">
            {activeWork.year && <span>{activeWork.year}</span>}
            <span>{activeWork.stack.slice(0, 3).join(" · ")}</span>
          </div>
          <Link className="v2-arrow-link" href={`/works/${activeWork.slug}`}>{labels.readMore} <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </div>
      </article>
      <div className="v2-home__featured-controls" aria-label={labels.region}>
        <button type="button" className="v2-home__featured-control" onClick={() => changeSlide(activeIndex - 1, "previous")} aria-label={labels.previous}><ArrowLeft aria-hidden="true" size={16} /><span>{labels.previous}</span></button>
        <span className="v2-home__featured-position" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}<span className="sr-only">{` ${labels.position}`}</span></span>
        <button type="button" className="v2-home__featured-control" onClick={() => changeSlide(activeIndex + 1, "next")} aria-label={labels.next}><span>{labels.next}</span><ArrowRight aria-hidden="true" size={16} /></button>
      </div>
    </div>
  );
}
