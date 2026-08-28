import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div className="footer-brand"><Link className="wordmark" href="/" aria-label="NasLabs home"><span className="wordmark-mark">N</span><span>NasLabs</span></Link><p>Independent software development studio.<br />Build. Experiment. Ship.</p></div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link></div>
        <div className="footer-column footer-contact"><span className="footer-label">Start a conversation</span><a href={`mailto:${siteConfig.contactEmail}`} data-analytics-event="email_click" data-analytics-category="contact"><Mail aria-hidden="true" />{siteConfig.contactEmail}</a><Link href="/contact" data-analytics-event="start_project" data-analytics-category="cta">Tell us about your project <ArrowUpRight aria-hidden="true" /></Link></div>
      </div>
      <div className="section-shell footer-bottom"><span>© 2026 NasLabs</span><span>Based in Indonesia · working globally</span><Link href="#top">Back to top ↑</Link></div>
    </footer>
  );
}
