"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import BackToTop from "@/components/BackToTop"; // <-- 1. Import the new component
import CustomCursor from "@/components/CustomCursor"; // 1. Import the cursor
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[999] bg-black flex items-center justify-center pointer-events-none"
              >
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src="/kahory media icon png 3-d.png" 
                  className="h-24 w-auto grayscale"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <CustomCursor /> {/* 2. Add it globally here */}
          {/* 2. Place it here so it hovers over all pages */}
          <BackToTop /> 
          
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}