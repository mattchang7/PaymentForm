import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Payment Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col items-center bg-zinc-100 text-sm h-full">
        {children}
      </body>
    </html>
  );
}
