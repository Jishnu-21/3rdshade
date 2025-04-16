interface Project {
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "3rdshade Realty",
    description: "We create distinctive brand identities that resonate with your audience and set you apart in the market.",
    src: "brand-identity.jpg",
    url: "/services/realty",
    color: "#2A9D8F", // Elegant Teal
  },
  {
    title: "3rdshade Finance",
    description: "From websites to apps, we craft intuitive digital experiences that engage and delight users.",
    src: "digital-design.jpg",
    url: "/services/digital-design",
    color: "#264653", // Deep Blue-Green
  },
  {
    title: "3rdshade Live",
    description: "Bring your brand to life with captivating motion graphics and animations that tell your story.",
    src: "motion-graphics.jpg",
    url: "/services/motion-graphics",
    color: "#E76F51", // Warm Coral
  },
];
