"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import BackToTop from "@/components/BackToTop"; 
import SplashCursor from "@/components/SplashCursor";
import CustomCursor from "@/components/CustomCursor"; 
import FloatingCTA from "@/components/FloatingCTA";
import FloatingDock from "@/components/FloatingDock";
import AIChat from "@/components/AIChat";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 1. Default to TRUE so the loader covers the screen immediately on first load
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);

  // 2. Synchronous state update. 
  // This detects a route change and turns the loader on BEFORE the new page paints.
  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setIsLoading(true);
  }

  useEffect(() => {
    // The loader is already active. Now we just wait 1 second and fade it out.
    const timer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(timer);
  }, [pathname]);

  // --- GLOBAL SECURITY DETERRENTS ---
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => e.preventDefault();

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("dragstart", handleDragStart);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-black antialiased font-sans select-none">
        <SmoothScroll>
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                key="loader"
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
              >
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  src="/kahory media icon png 3-d.png" 
                  className="h-24 w-auto grayscale"
                  alt="Kahory Loading"
                  draggable="false"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <SplashCursor /> 
          <CustomCursor /> 
          <BackToTop /> 
          <AIChat />
          <FloatingCTA />
          <FloatingDock />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}