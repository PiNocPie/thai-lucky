import "./globals.css";

export const metadata = {
  title: "ดาวนำโชค — Lucky Star Oracle",
  description: "ค้นพบเลขมงคลประจำวัน ดวงชะตา สีนำโชค ตามวันเกิดของคุณ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
