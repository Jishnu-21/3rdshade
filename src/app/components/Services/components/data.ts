interface Project {
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "Brand Identity",
    description: "We create distinctive brand identities that resonate with your audience and set you apart in the market.",
    src: "brand-identity.jpg",
    url: "/services/brand-identity",
    color: "#e3e5e7",
  },
  {
    title: "Digital Design",
    description: "From websites to apps, we craft intuitive digital experiences that engage and delight users.",
    src: "digital-design.jpg",
    url: "/services/digital-design",
    color: "#d6d7dc",
  },
  {
    title: "Motion Graphics",
    description: "Bring your brand to life with captivating motion graphics and animations that tell your story.",
    src: "motion-graphics.jpg",
    url: "/services/motion-graphics",
    color: "#e3e3e3",
  },
  {
    title: "UI/UX Design",
    description: "We design user-centric interfaces that combine aesthetics with functionality for seamless experiences.",
    src: "ui-ux-design.jpg",
    url: "/services/ui-ux-design",
    color: "#e5e5e5",
  }
];