import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background ambient-glow-mesh relative overflow-x-hidden">
      {/* Fixed Ambient Glowing Spheres */}
      <div className="pointer-events-none fixed -top-24 right-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#FF6B5B]/15 via-[#FFA07A]/10 to-transparent blur-[140px] -z-10 animate-float" />
      <div className="pointer-events-none fixed -bottom-24 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#0D9488]/15 via-[#2DD4BF]/10 to-transparent blur-[130px] -z-10" />
      <div className="pointer-events-none fixed top-1/3 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#14213D]/12 to-transparent dark:from-[#1E2D4A]/40 blur-[120px] -z-10" />

      <Sidebar className="hidden lg:flex" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}

