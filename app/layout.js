import "./globals.css";

export const metadata = {
  title: "ดาวนำโชค — Lucky Star Oracle",
  description: "ค้นพบเลขมงคลประจำวัน ดวงชะตา สีนำโชค ตามวันเกิดของคุณ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ดาวนำโชค",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  themeColor: "#D4A017",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
