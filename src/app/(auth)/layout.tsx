"use client";
import DotPattern from "@/components/magicui/dot-pattern";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Skeleton } from "@/components/ui/skeleton";
const ShootingStars = React.lazy(
  () => import("@/components/ui/shooting-stars")
);
import { StarsBackground } from "@/components/ui/stars-background";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";
import { Suspense, useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center ">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton className="w-full h-full bg-gray-300 dark:bg-gray-700" />
          </div>
        }
      >
        <ShootingStars />
      </Suspense>

      <StarsBackground />

      <Suspense
        fallback={
          <div className="relative z-10 p-4">
            <Skeleton className="w-full h-60 bg-gray-300 dark:bg-gray-700" />
          </div>
        }
      >
        <div className="relative">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>
      </Suspense>
    </div>
  );
};

export default Layout;
