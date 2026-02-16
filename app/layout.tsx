import type { Metadata } from "next";
import "./globals.css";
import { themeCssVariables } from "@/lib/themeCssVariables";

export const metadata: Metadata = {
  title: "Stack Capital",
  description: "Stack Capital investment deck"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={themeCssVariables}>{children}</body>
    </html>
  );
}
