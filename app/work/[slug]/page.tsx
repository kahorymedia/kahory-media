import { workData } from "@/data/work";
import Link from "next/link";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return workData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = workData.find((p) => p.slug === slug);

  if (!project) notFound();

  // ✅ NEW: Find related projects (Prefer same category, then fallback to others)
  let relatedProjects = workData.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 2);
  if (relatedProjects.length < 2) {
    const filler = workData.filter((p) => p.slug !== project.slug && !relatedProjects.includes(p)).slice(0, 2 - relatedProjects.length);
    relatedProjects = [...relatedProjects, ...filler];
  }

  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      
      {/* MINIMAL TOP NAVIGATION */}
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex items-center justify-between pointer-events-auto mix-blend-difference">
        <Link href="/work" className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest mt-0.5">Back to Work</span>
        </Link>
      </header>

      {/* MASSIVE CINEMATIC HEADER */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center px-6 md:px-12 pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black">
              {project.category}
            </span>
            <span className="text-[#E5D3B3] font-mono text-sm">
              Client: {project.client}
            </span>
          </div>
          <h1 className="text-5xl md:text-[clamp(4rem,7vw,6rem)] font-bold tracking-tighter leading-[0.9] text-white uppercase max-w-4xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* ✅ NEW: GRID LAYOUT FOR MAIN CONTENT & SIDEBAR */}
      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* LEFT: Main Content Area (Spans 8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
          
          {/* Objective & Metrics */}
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E61919] font-bold block mb-4">The Objective</span>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-lg">
                We partnered with {project.client} to build a high-converting short-form pipeline. The goal was simple: capture attention, prove authority in the {project.category.toLowerCase()} space, and drive massive engagement.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Result 0{i + 1}</span>
                  <span className="text-2xl md:text-4xl font-bold tracking-tighter text-white">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="w-full aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center relative group cursor-pointer">
            <img src={project.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:bg-[#E61919] group-hover:border-[#E61919] transition-all duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>

        </div>

        {/* RIGHT: Sticky Sidebar (Spans 4 columns) */}
        <aside className="lg:col-span-4 hidden lg:flex flex-col gap-8">
          <div className="sticky top-32 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3] font-bold block border-b border-white/10 pb-4">
              Related Case Studies
            </span>
            
            {relatedProjects.map((relProject) => (
              <Link href={`/work/${relProject.slug}`} key={relProject.id} className="group flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-white/5">
                  <img src={relProject.coverImage} alt={relProject.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">{relProject.category}</span>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#E61919] transition-colors">{relProject.title}</h4>
                </div>
              </Link>
            ))}

            <Link href="/contact" className="mt-8 w-full py-4 border border-white/20 text-white text-center rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Start a Project
            </Link>
          </div>
        </aside>

      </section>

      {/* MOBILE ONLY: Next Project CTA (Hidden on desktop since it's in sidebar) */}
      <section className="lg:hidden w-full py-24 bg-white/[0.02] flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
        <h2 className="text-3xl font-bold text-white tracking-tighter mb-8">Want results like this?</h2>
        <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#E5D3B3] transition-colors duration-300">
          Start Your Pipeline
        </Link>
      </section>

      <Footer />
    </main>
  );
}