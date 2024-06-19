import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const poppins = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Iron man selector",
  description:
    "Bats toi contre ton nemesis et force le à t'offrir ton prochain Kebab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
