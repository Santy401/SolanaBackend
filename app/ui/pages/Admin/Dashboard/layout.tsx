import type { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/app/ui/components/Dashboard/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <Navbar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
