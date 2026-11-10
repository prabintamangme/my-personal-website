const pdfTitle = process.env.NEXT_PUBLIC_FREE_PDF_TITLE?.trim();
const pdfUrl = process.env.NEXT_PUBLIC_FREE_PDF_URL?.trim();

export const freePdf = pdfTitle && pdfUrl ? { title: pdfTitle, url: pdfUrl } : null;
export const primaryCtaLabel = freePdf
  ? "Subscribe & Get the Free PDF"
  : "Subscribe for Learning Updates";
export const phoneUpdatesAvailable =
  process.env.NEXT_PUBLIC_PHONE_UPDATES_AVAILABLE === "true";
