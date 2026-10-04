import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOST DRAGON — Enter My Mind",
  description: "An immersive creative universe spanning art, digital work, fashion, furniture, sound and objects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
