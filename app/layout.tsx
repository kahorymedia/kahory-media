"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import BackToTop from "@/components/BackToTop"; 
import SplashCursor from "@/components/SplashCursor";
import CustomCursor from "@/components/CustomCursor"; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // 1. FIX: Default to TRUE so the loader covers the screen immediately on first load
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);

  // 2. FIX: Synchronous state update. 
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

  return (
    <html lang="en">
      <body className="bg-black antialiased font-sans">
        <SmoothScroll>
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                key="loader"
                // 3. FIX: Initial opacity set to 1. It starts pitch black, no fade-in flash!
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                // Increased z-index to 9999 to guarantee it covers the header and cursor
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
              >
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  src="/kahory media icon png 3-d.png" 
                  className="h-24 w-auto grayscale"
                  alt="Kahory Loading"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <SplashCursor /> 
          <CustomCursor /> 
          <BackToTop /> 
          
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}