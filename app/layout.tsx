import "./globals.css";

export const metadata = {
  title: "Miona's poomang",
  description: "Which Miona Are You?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
