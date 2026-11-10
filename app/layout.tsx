import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const baseUrl = siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "LEARNINGEVERGROW — Prabin Tamang", template: "%s — LEARNINGEVERGROW" },
  description: "Explore finance, economics, and current events through clear articles, research, and practical learning resources.",
  alternates: { canonical: "/" },
  openGraph: { title: "LEARNINGEVERGROW", description: "Clear articles, research, and practical resources for understanding finance, economics, and current events.", type: "website", url: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { colorScheme: "light dark", themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f4ec" }, { media: "(prefers-color-scheme: dark)", color: "#0b1720" }] };
const themeScript = `(function(){try{var t=localStorage.getItem('leg-theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Person", name: "Prabin Tamang", jobTitle: "Finance & Economics Graduate", email: "mailto:prabintamangme@gmail.com", url: baseUrl };
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>
    <a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  </body></html>;
}
