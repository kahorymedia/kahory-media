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
    client: "Nik'J, Maddify and Ombra House",
    // ✅ NEW: You can now add multiple categories here!
    categories: ["Live Events"], 
    coverImage: "/selectedwork/covers/cover1.jpg", 
    metrics: ["22.6k Views", "SOLD-OUT"],
  },
  {
    id: "2",
    slug: "project-two-slug",
    title: "Range Rover Sport delivery",
    client: "Yash Singhwal",
    categories: ["Luxury Goods", "Automobile"],
    coverImage: "/selectedwork/covers/cover2.jpg",
    metrics: ["1.3M Views", "12.1k shares"],
  },
  {
    id: "3",
    slug: "project-three-slug",
    title: "Campaign Name 3",
    client: "Ambika Arora- Influencer",
    categories: ["Lifestyle"],
    coverImage: "/selectedwork/covers/cover3.jpg",
    metrics: ["cinematic video", "38k+ followers"],
  },
  {
    id: "4",
    slug: "project-four-slug",
    title: "Campaign Name 4",
    client: "Event Company D",
    categories: ["Live Events", "Music Videos"],
    coverImage: "/selectedwork/covers/cover4.jpg",
    metrics: ["10M+ Reach", "Trending"],
  },
  {
    id: "5",
    slug: "project-five-slug",
    title: "Campaign Name 5",
    client: "Yash Singhwal",
    categories: ["Live Events", "Automobile"],
    coverImage: "/selectedwork/covers/cover5.jpg",
    metrics: ["102k views", "Viral Format", "Massive Engagement"],
  },
  {
    id: "6",
    slug: "project-six-slug",
    title: "Soleverse- Pilot’s Watch Chronograph 41 Edition “Mercedes-AMG PETRONAS Formula One™ Team” watch",
    client: "Soleverse",
    categories: ["Luxury Goods", "Lifestyle"],
    coverImage: "/selectedwork/covers/cover6.jpg",
    metrics: ["yet to be determined"],
  },
  // ... Keep copying and pasting this block to add projects 7 through 18!
];