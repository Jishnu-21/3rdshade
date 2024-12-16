import { LucideIcon } from 'lucide-react';
import { 
  BookOpen, 
  Palette, 
  Building2, 
  Trophy, 
  Settings, 
  Lightbulb,
  Target,
  Rocket,
  Globe,
  Users,
  Zap,
  Star
} from 'lucide-react';

export interface TimelineItemData {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const timelineData: TimelineItemData[] = [
  {
    title: "Narrate Compelling Stories",
    description: "Crafting stories that resonate and inspire, we bring your brand's narrative to life.",
    icon: BookOpen
  },
  {
    title: "Craft Visual Narratives",
    description: "Creating impactful visual experiences that capture attention and communicate effectively.",
    icon: Palette
  },
  {
    title: "Build Brands that Make a Difference",
    description: "Developing meaningful brand identities that stand out in the market.",
    icon: Building2
  },
  {
    title: "Create Success Stories",
    description: "Turning visions into achievements through strategic planning and execution.",
    icon: Trophy
  },
  {
    title: "Serve End-to-End Solutions",
    description: "Providing comprehensive business solutions for your digital presence.",
    icon: Settings
  },
  {
    title: "Strategic Business Consulting",
    description: "Expert guidance for growth in the modern business landscape.",
    icon: Lightbulb
  },
  {
    title: "Market Positioning",
    description: "Strategically position your brand to reach your target audience effectively.",
    icon: Target
  },
  {
    title: "Growth Acceleration",
    description: "Accelerate your business growth with data-driven strategies and innovation.",
    icon: Rocket
  },
  {
    title: "Global Reach",
    description: "Expand your presence across borders with localized marketing approaches.",
    icon: Globe
  },
  {
    title: "Community Building",
    description: "Create and nurture engaged communities around your brand.",
    icon: Users
  },
  {
    title: "Digital Transformation",
    description: "Guide your business through digital evolution and technological advancement.",
    icon: Zap
  },
  {
    title: "Brand Excellence",
    description: "Achieve and maintain the highest standards of brand performance.",
    icon: Star
  }
];