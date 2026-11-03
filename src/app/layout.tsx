import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "MoneyTrack — Personal Finance Management",
    template: "%s | MoneyTrack",
  },
  description:
    "Aplikasi manajemen keuangan pribadi terstruktur untuk memantau pemasukan, pengeluaran, saldo rekening, dan anggaran bulanan secara akurat dan aman.",
  keywords: [
    "manajemen keuangan",
    "personal finance",
    "catat pengeluaran",
    "anggaran bulanan",
    "pelacak uang",
    "money tracking",
    "keuangan keluarga",
  ],
  authors: [{ name: "MoneyTrack Team" }],
  creator: "MoneyTrack",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "MoneyTrack — Solusi Cerdas Kelola Keuangan Pribadi",
    description:
      "Pantau saldo rekening, catat transaksi pemasukan/pengeluaran, dan tetapkan anggaran bulanan Anda dalam satu platform terintegrasi.",
    siteName: "MoneyTrack",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyTrack — Personal Finance Management",
    description:
      "Aplikasi manajemen keuangan pribadi dengan isolasi data terenkripsi dan kalkulasi integer rupiah presisi tinggi.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <TooltipProvider>
              {children}
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
