// data/content.ts

export const siteData = {
  brand: {
    name: "Kahory Media",
    email: "kahorymedia@gmail.com",
  },
  hero: {
    headline: "Stop posting. Start converting.",
    subtext: "We engineer retention-optimized short-form content. Taking your brand from mindless scrolling to measurable impact.",
    cta: "Let's Talk",
  },
  about: {
    title: "The approach.",
    // This text appears in Box 1 (The Story)
    description: "Kahory Media is a content-first agency. We don't just edit videos; we build scalable storytelling systems. Focused on high-performing formats, hook-based structures, and visual excellence, we turn complex ideas into intuitive, viral-ready experiences.",
    
    // This text appears in Box 3 (The Philosophy)
    philosophy: {
      headingNormal: "Our name is ",
      headingHighlight: "our promise.",
      paragraph1: "Kahory is built from two words: kahani, the Hindi word for story, and story itself. It is not a coincidence. It is conviction. We believe every brand holds a story worth telling, and most of them never get told with the weight they deserve.",
      paragraph2: "We are not a content mill. We are a storytelling studio. We find the meaning inside your brand, shape it into a narrative that earns attention, and engineer it into short-form experiences that convert that attention into trust."
    }
  },
  stats: [
    { value: "5M+", label: "Organic Impressions" },
    { value: "150+", label: "Edits Delivered" },
    { value: "40+", label: "Videos / Month" },
    { value: "2+", label: "Years Experience" },
  ],
  services: [
    { title: "Content Strategy", desc: "Data-driven ideation and hook-based storytelling." },
    { title: "Production", desc: "High-end shooting and creative direction." },
    { title: "Editing & Post", desc: "Dynamic cuts, color, and retention-focused pacing." },
    { title: "Media Management", desc: "End-to-end publishing and community scaling." },
    { title: "Consulting", desc: "Audits and playbooks for internal teams." },
  ],
  work: {
    driveLink: "https://drive.google.com/drive/folders/1kiN3uBkhJswbgq8BlFfSAYQlYfiqWEZb",
    reels: [
      {
        id: 1,
        title: "Cinematic Promo",
        client: "Yash Singhwal X Skillbox",
        videoSrc: "/reel1.mp4", 
        instaLink: "https://www.instagram.com/reel/DVbFHHdk5nK/?igsh=MnU3enRyOHlsZnQx",
      },
      {
        id: 2,
        title: "Red City Boiler Room",
        client: "DJ Maddify X Ombra House",
        videoSrc: "/reel2.mp4", 
        instaLink: "https://www.instagram.com/reel/DJZNExATQNS/?igsh=ODQ4NHhnZDI1a3Fs",
      },
      {
        id: 3,
        title: "Fun Challenges",
        client: "Urban Guide",
        videoSrc: "/reel3.mp4", 
        instaLink: "https://www.instagram.com/reel/DR1wR9BDH81/?igsh=MTlwOWFrNDd0MHg5MQ==",
      },
    ]
  },
  contact: {
    headline: "Let’s tell your story the right way.",
    subtext: "Ready to accelerate your journey through digital media?",
  }
};