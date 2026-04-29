"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "./GlassSurface";

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showExitConfirm, setShowExitConfirm] = useState(false); // NEW: State for the confirmation dialogue
  const [formData, setFormData] = useState({
    objective: "",
    budget: "",
    name: "",
    email: "",
    brandLink: "",
  });

  // Lock body scrolling when the funnel is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  
  const closeFunnel = () => {
    setIsOpen(false);
    setShowExitConfirm(false);
    setTimeout(() => {
      setStep(1); // Reset step after closing animation finishes
      setFormData({ objective: "", budget: "", name: "", email: "", brandLink: "" }); // Clear form
    }, 500); 
  };

  // NEW: Handles the logic for attempting to close
  const attemptClose = () => {
    // If they are on the success screen, just close it. Otherwise, ask for confirmation.
    if (step === 4) {
      closeFunnel();
    } else {
      setShowExitConfirm(true);
    }
  };

  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would connect to your backend (FormSpree, Resend, or your own API)
    console.log("Form Submitted:", formData);
    handleNext(); // Move to the success screen
  };

  return (
    <>
      {/* 1. THE FLOATING GLASS BUTTON */}
      <div className="fixed bottom-[110px] md:bottom-[120px] left-1/2 -translate-x-1/2 z-[400] pointer-events-auto">
        <div onClick={() => setIsOpen(true)} className="group cursor-pointer">
          <GlassSurface 
            width={260} 
            height={64} 
            borderRadius={32} 
            blur={8} 
            opacity={0.9} 
            distortionScale={-220}
          >
            <div className="flex items-center gap-4 relative z-20">
              <div className="w-2.5 h-2.5 bg-[#E61919] rounded-full animate-pulse shadow-[0_0_12px_#E61919]" />
              <span className="text-white font-bold tracking-[0.25em] text-[11px] md:text-[13px] uppercase group-hover:text-[#E5D3B3] transition-colors drop-shadow-md">
                Start a Project
              </span>
            </div>
          </GlassSurface>
        </div>
      </div>

      {/* 2. THE INTERACTIVE FUNNEL MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            // NEW: Clicking the blurred background triggers the close attempt
            onClick={attemptClose}
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 md:p-6 pointer-events-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              // NEW: stopPropagation prevents clicks inside the modal from closing it
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#050505] border border-white/10 rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
            >
              
              {/* NEW: EXIT CONFIRMATION OVERLAY */}
              <AnimatePresence>
                {showExitConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                  >
                    <h4 className="text-3xl font-bold text-white tracking-tighter mb-4">Discard Progress?</h4>
                    <p className="text-white/40 text-sm mb-8 max-w-sm">
                      You haven't submitted your request yet. Are you sure you want to close this window?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => setShowExitConfirm(false)} 
                        className="px-8 py-4 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors"
                      >
                        No, Resume
                      </button>
                      <button 
                        onClick={closeFunnel} 
                        className="px-8 py-4 rounded-full bg-[#E61919] text-white text-xs uppercase tracking-widest font-bold hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(230,25,25,0.4)]"
                      >
                        Yes, Exit
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header & Progress Bar */}
              <div className="px-8 pt-8 pb-4 flex justify-between items-center relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                  {step < 4 ? `Step 0${step} of 03` : "Transmission Sent"}
                </span>
                
                {/* NEW: Massively increased the clickable padding (p-4) but offset it (-mr-4 -mt-4) so it looks normal visually */}
                <button 
                  onClick={attemptClose} 
                  className="p-4 -mr-4 -mt-4 text-white/40 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>

              {/* Progress Line */}
              <div className="w-full h-[1px] bg-white/5 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#E5D3B3]" 
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Dynamic Step Content */}
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar relative">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: OBJECTIVE */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2">How can we help?</h3>
                        <p className="text-white/40 text-sm">Select the primary focus for your brand right now.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { title: "High-End Production", desc: "Cinematic shooting, directing, and high-retention editing." },
                          { title: "Short-Form Strategy", desc: "Hook-driven ideation and format development for social." },
                          { title: "Full-Stack Media Management", desc: "End-to-end consulting, pipeline management, and growth." }
                        ].map((opt) => (
                          <button
                            key={opt.title}
                            onClick={() => { setFormData({ ...formData, objective: opt.title }); handleNext(); }}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 ${formData.objective === opt.title ? "border-[#E5D3B3] bg-[#E5D3B3]/5" : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"}`}
                          >
                            <span className="block text-lg font-bold text-white mb-1">{opt.title}</span>
                            <span className="block text-sm text-white/50">{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: BUDGET */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2">Scope & Scale.</h3>
                        <p className="text-white/40 text-sm">To align our strategies, what is your anticipated monthly budget?</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Under $2,000", "$2,500 - $5,000", "$5,000 - $10,000", "$10,000+"].map((tier) => (
                          <button
                            key={tier}
                            onClick={() => { setFormData({ ...formData, budget: tier }); handleNext(); }}
                            className={`p-6 rounded-2xl border text-center transition-all duration-300 ${formData.budget === tier ? "border-[#E5D3B3] bg-[#E5D3B3]/5" : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"}`}
                          >
                            <span className="block text-lg font-bold text-white">{tier}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTACT DETAILS */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2">Let's connect.</h3>
                        <p className="text-white/40 text-sm">Where should we send the strategic proposal?</p>
                      </div>
                      <form id="lead-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Your Name</label>
                          <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/20 text-white pb-3 focus:outline-none focus:border-[#E5D3B3] transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Email Address</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/20 text-white pb-3 focus:outline-none focus:border-[#E5D3B3] transition-colors" placeholder="john@brand.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Brand / Social Link</label>
                          <input required type="text" value={formData.brandLink} onChange={(e) => setFormData({...formData, brandLink: e.target.value})} className="w-full bg-transparent border-b border-white/20 text-white pb-3 focus:outline-none focus:border-[#E5D3B3] transition-colors" placeholder="instagram.com/yourbrand" />
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 4: SUCCESS */}
                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 gap-6">
                      <div className="w-20 h-20 rounded-full bg-[#E5D3B3]/10 border border-[#E5D3B3] flex items-center justify-center text-[#E5D3B3]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white tracking-tighter mb-2">Request Received.</h3>
                        <p className="text-white/40 text-sm max-w-sm mx-auto">Our team is reviewing your profile. We will reach out to {formData.email} within 24 hours.</p>
                      </div>
                      <button onClick={closeFunnel} className="mt-4 px-8 py-3 bg-white text-black rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#E5D3B3] transition-colors">
                        Return to Site
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Footer Controls */}
              {step < 4 && (
                <div className="px-8 py-6 bg-white/[0.02] border-t border-white/5 flex justify-between items-center z-10">
                  {step > 1 ? (
                    <button onClick={handleBack} className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                      Back
                    </button>
                  ) : (
                    <div /> // Empty div for spacing
                  )}
                  {step === 3 ? (
                    <button type="submit" form="lead-form" className="px-8 py-3 bg-[#E61919] text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(230,25,25,0.4)]">
                      Submit Request
                    </button>
                  ) : null}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}