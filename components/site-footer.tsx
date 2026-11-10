import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return <footer className="footer"><div className="shell">
    <div className="footer-grid">
      <div className="stack"><Link className="brand logo-brand" href="/" aria-label="LEARNINGEVERGROW home"><Image className="logo-image" src="/brand/learningevergrow-logo.png" alt="LEARNINGEVERGROW" width={2170} height={430} /></Link><p className="muted">Clear articles and practical learning resources for understanding finance, economics, and a changing world.</p></div>
      <div className="footer-links"><strong>Explore</strong><Link href="/learning">Learning & Blog</Link><Link href="/publications">Publications</Link><Link href="/newsletter">Learning updates</Link></div>
      <div className="footer-links"><strong>About</strong><Link href="/about">About Prabin</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy Policy</Link></div>
      <div className="footer-links"><strong>Connect</strong><a href="mailto:prabintamangme@gmail.com">prabintamangme@gmail.com</a><Link href="/admin">Admin</Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Prabin Tamang</span><span>Keep learning. Keep growing.</span></div>
  </div></footer>;
}
