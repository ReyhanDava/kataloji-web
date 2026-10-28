import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE = "https://kataloji-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Kataloji Coffee & Eatery — Cipayung, Jakarta Timur",
    template: "%s · Kataloji Coffee & Eatery",
  },
  description:
    "Coffee & eatery di Cipayung, Jakarta Timur. Kopi, non-kopi, dan hidangan Nusantara–Asia–Western dalam satu ruang. Buka Senin–Jumat 08.00–22.00, Sabtu–Minggu 08.00–23.00.",
  applicationName: "Kataloji Coffee & Eatery",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE,
    siteName: "Kataloji Coffee & Eatery",
    title: "Kataloji Coffee & Eatery — Cipayung, Jakarta Timur",
    description:
      "Kopi, non-kopi, dan hidangan Nusantara–Asia–Western dalam satu ruang. Cipayung, Jakarta Timur.",
    images: [
      {
        url: "/assets/og-kataloji.jpg",
        width: 1200,
        height: 630,
        alt: "Kataloji Coffee & Eatery — Cipayung, Jakarta Timur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kataloji Coffee & Eatery — Cipayung, Jakarta Timur",
    description:
      "Kopi, non-kopi, dan hidangan Nusantara–Asia–Western dalam satu ruang.",
    images: ["/assets/og-kataloji.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3A4636",
};

/** JSON-LD Restaurant — bikin Google bisa menampilkan alamat, jam buka, dan telepon. */
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BRAND.fullName,
    image: `${SITE}/assets/og-kataloji.jpg`,
    url: SITE,
    telephone: `+${BRAND.whatsapp}`,
    servesCuisine: ["Coffee", "Indonesian", "Asian", "Western"],
    priceRange: "Rp 18.000 – Rp 70.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ruko Puri Cipayung, Jl. Setu Cipayung No.09",
      addressLocality: "Jakarta Timur",
      addressRegion: "DKI Jakarta",
      postalCode: "13840",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.3260829604653965,
      longitude: 106.9037646194168,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    ],
    sameAs: [BRAND.instagramUrl, BRAND.grabfoodUrl],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify aman: isinya data statis dari lib/data.ts
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        {children}
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
