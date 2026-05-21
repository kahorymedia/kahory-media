// data/work.ts

export const categories = [
  "All", 
  "F&B", 
  "Luxury Goods", 
  "Medical Creators", 
  "Automobile", 
  "Live Events", 
  "Social Work", 
  "Music Videos", 
  "Real Estate", 
  "Lifestyle"
];

// I've created 6 template slots. You can copy/paste these to build all 18 of your projects!
export const workData = [
  {
    id: "1",
    slug: "project-one-slug",
    title: "Red City Boiler Room",
    client: "Nik'J, Maddify & Ombra House",
    categories: ["Live Events"], 
    coverImage: "/selectedwork/covers/cover1.jpg", 
    metrics: ["22.6k Views", "SOLD-OUT"],
    projectType: "video",
    videoLink: "https://www.instagram.com/reel/example1"
  },
  {
    id: "2",
    slug: "project-two-slug",
    title: "Range Rover Sport delivery",
    client: "Yash Singhwal",
    categories: ["Luxury Goods", "Automobile"],
    coverImage: "/selectedwork/covers/cover2.jpg",
    metrics: ["1.3M Views", "12.1k shares"],
    projectType: "video",
    videoLink: "https://www.youtube.com/watch?v=example2"
  },
  {
    id: "3",
    slug: "project-three-slug",
    title: "Cinematic dream-scape video",
    client: "Ambika Arora- Influencer",
    categories: ["Lifestyle"],
    coverImage: "/selectedwork/covers/cover3.jpg",
    metrics: ["cinematic video", "38k+ followers"],
    projectType: "video",
    videoLink: "https://www.instagram.com/reel/example3"
  },
  {
    id: "4",
    slug: "project-four-slug",
    title: "DJ Maddify X Baardos Aftermovie",
    client: "DJ Maddify and Baardos",
    categories: ["Live Events", "Music Videos"],
    coverImage: "/selectedwork/covers/cover4.jpg",
    metrics: ["140k+ Reach", "Trending"],
    projectType: "video",
    videoLink: "https://www.instagram.com/reel/example4"
  },
  {
    id: "5",
    slug: "project-five-slug",
    title: "Kohram tour campaign",
    client: "Yash Singhwal",
    categories: ["Live Events", "Automobile"],
    coverImage: "/selectedwork/covers/cover5.jpg",
    metrics: ["102k+ views", "Viral Format", "Massive Engagement"],
    projectType: "video",
    videoLink: "https://www.instagram.com/reel/example5"
  },
  {
    id: "6",
    slug: "project-six-slug",
    title: "Soleverse- IWC “Mercedes-AMG PETRONAS Formula One™ Team” watch",
    client: "Soleverse",
    categories: ["Luxury Goods", "Lifestyle"],
    coverImage: "/selectedwork/covers/cover6.jpg",
    metrics: ["yet to be determined"],
    projectType: "video",
    videoLink: "https://www.instagram.com/reel/example6"
  },
  {
    id: "7",
    slug: "project-seven-slug",
    title: "Airbnb property Shoot",
    client: "Muffin Stays",
    categories: ["Real Estate", "Lifestyle"],
    coverImage: "/selectedwork/covers/cover13.jpg",
    metrics: ["High Quality", "Interior Design"],
    projectType: "photography",
    gallery: ["/selectedwork/gallery/1.jpg", "/selectedwork/gallery/2.jpg", "/selectedwork/gallery/3.jpg", "/selectedwork/gallery/4.jpg", "/selectedwork/gallery/5.jpg"]
  },
  // ... Keep copying and pasting this block to add projects 7 through 18!
];