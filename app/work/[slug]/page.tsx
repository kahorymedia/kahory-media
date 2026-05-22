import { workData } from "@/data/work";
import Link from "next/link";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import BentoGallery from "@/components/BentoGallery";

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

  let relatedProjects = workData.filter(
    (p) => p.slug !== project.slug && p.categories.some(cat => project.categories.includes(cat))
  ).slice(0, 2);
  
  if (relatedProjects.length < 2) {
    const filler = workData.filter((p) => p.slug !== project.slug && !relatedProjects.includes(p)).slice(0, 2 - relatedProjects.length);
    relatedProjects = [...relatedProjects, ...filler];
  }

  const isPhotography = project.projectType?.trim().toLowerCase() === "photography" && Array.isArray(project.gallery) && project.gallery.length > 0;

  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex items-center justify-between pointer-events-auto mix-blend-difference">
        <Link href="/work" className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300">
          <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-xs font-bold uppercase tracking-widest mt-0.5">Back to Work</span>
        </Link>
      </header>

      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center px-6 md:px-12 pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black">
              {project.categories[0]}
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

      <section className="w-full px-6 md:px-12 max-w-[1200px] mx-auto py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E61919] font-bold block mb-4">The Objective</span>
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-lg">
                We partnered with {project.client} to deliver a premium visual experience. The goal was simple: capture attention, prove authority in the {project.categories[0].toLowerCase()} space, and drive massive engagement.
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
          
          {/* ✅ DYNAMIC RENDERER: Bento Grid (Photography) OR Premium Video Player (Link) */}
          {isPhotography ? (
            <BentoGallery gallery={project.gallery!} />
          ) : (
            <div className="relative w-full aspect-[4/5] md:aspect-video group cursor-pointer">
              
              {/* Ambient Glow Behind the Player */}
              <div className="absolute inset-8 bg-[#E61919] blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000 z-0" />

              <a 
                href={project.videoLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 group-hover:border-white/30 transition-colors duration-500 shadow-2xl flex flex-col justify-end"
              >
                {/* Base Image with cinematic slow-zoom */}
                <img src={project.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out" />
                
                {/* Top Status Bar */}
                <div className="absolute top-0 inset-x-0 p-6 md:p-8 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                  <span className="px-4 py-1.5 backdrop-blur-xl bg-white/10 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E61919] animate-pulse" />
                    Watch Full Video
                  </span>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/5 hidden sm:block">
                    {project.videoLink?.includes('instagram') ? 'Instagram Reel' : project.videoLink?.includes('youtube') || project.videoLink?.includes('youtu.be') ? 'YouTube Player' : 'External Link'}
                  </span>
                </div>

                {/* Magnetic/Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative flex items-center justify-center">
                    {/* Radar Rings */}
                    <div className="absolute inset-0 rounded-full border border-[#E61919] animate-ping opacity-0 group-hover:opacity-50 transition-opacity duration-300" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-[-15px] rounded-full border border-[#E61919]/50 animate-ping opacity-0 group-hover:opacity-30 transition-opacity duration-300 delay-300" style={{ animationDuration: '2s' }} />
                    
                    {/* Main Button */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-[#E61919] group-hover:border-[#E61919] group-hover:scale-110 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(230,25,25,0.4)]">
                      <svg className="w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Gradient & Text */}
                <div className="relative z-20 p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter mb-2 group-hover:text-[#E5D3B3] transition-colors duration-300">
                    Launch Player
                  </h3>
                  <p className="text-sm text-white/50 font-light max-w-md hidden md:block">
                    Opens in a high-quality external viewing experience.
                  </p>
                </div>
              </a>
            </div>
          )}
        </div> {/* ✅ THIS CLOSING DIV WAS MISSING IN YOUR CODE! */}

        {/* STICKY SIDEBAR */}
        <aside className="lg:col-span-4 hidden lg:flex flex-col gap-8">
          <div className="sticky top-32 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E5D3B3] font-bold block border-b border-white/10 pb-4">
              Related Case Studies
            </span>
            
            {relatedProjects.map((relProject) => (
              <Link href={`/work/${relProject.slug}`} key={relProject.id} className="group block relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-white/20 transition-colors duration-500">
                <img src={relProject.coverImage} alt={relProject.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col z-10">
                  <span className="text-[9px] uppercase tracking-widest text-white/70 block mb-1">{relProject.categories[0]}</span>
                  <h4 className="text-lg font-bold text-white leading-tight group-hover:text-[#E61919] transition-colors">{relProject.title}</h4>
                </div>
              </Link>
            ))}

            <Link href="/contact" className="mt-8 w-full py-4 border border-white/20 text-white text-center rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Start a Project
            </Link>
          </div>
        </aside>

      </section>

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