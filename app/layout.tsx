import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Album Image Getter Outter",
  description: "A web app to get album images from Imgur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-200 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
