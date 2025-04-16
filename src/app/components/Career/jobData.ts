interface JobDescription {
  title: string;
  description: string;
  location: string;
  duration?: string;
  experience?: string;
  salary: string;
  email: string;
  website: string;
  aboutUs: string;
  roleOverview: string;
  requirements: string[];
  responsibilities: string[];
  bonusSkills: string[];
  perks?: string[];
}

export const jobData: Record<string, JobDescription> = {
  "Graphic Designer": {
    title: "Graphic Designer",
    description: "Join our creative team as a Graphic Designer and help bring innovative visual concepts to life in a fast-paced agency environment.",
    location: "Pune (On-site)",
    experience: "1-3 years (Freshers with exceptional portfolio can also apply)",
    salary: "Based on skills and experience",
    email: "info@3rdshade.in",
    website: "3rdshade.in | 3rdshade.com",
    aboutUs: "3rdshade is a dynamic digital agency specializing in innovative design solutions. We work with clients across industries to create impactful visual experiences that drive business growth.",
    roleOverview: "As a Graphic Designer at 3rdshade, you'll be responsible for creating visually stunning designs for various digital platforms. You'll work closely with our creative team to develop and execute design concepts that align with our clients' brand identities and business objectives.",
    requirements: [
      "Bachelor's degree in Design, Fine Arts, or related field",
      "1-3 years of experience in graphic design (Freshers with exceptional portfolio can apply)",
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Strong portfolio demonstrating creativity and technical skills",
      "Experience with UI/UX design principles",
      "Knowledge of current design trends and best practices"
    ],
    responsibilities: [
      "Create engaging designs for digital and print media",
      "Develop visual concepts and designs for websites, social media, and marketing materials",
      "Collaborate with the team to brainstorm and execute creative solutions",
      "Ensure brand consistency across all design deliverables",
      "Manage multiple projects while meeting tight deadlines",
      "Present design concepts to internal teams and clients"
    ],
    bonusSkills: [
      "Experience with motion graphics and animation",
      "Knowledge of HTML/CSS",
      "Understanding of responsive design principles",
      "Experience with video editing software",
      "Familiarity with prototyping tools like Figma or Adobe XD"
    ],
    perks: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Creative and collaborative work environment",
      "Regular team activities and events",
      "Work on diverse and challenging projects"
    ]
  },
  "Content Writer": {
    title: "Content Writer",
    description: "Join our team as a Content Writer and craft compelling narratives that drive engagement and business growth across multiple digital platforms.",
    location: "Pune (On-site)",
    experience: "1-3 years (Freshers with exceptional writing skills can also apply)",
    salary: "Competitive, based on experience",
    email: "info@3rdshade.in",
    website: "3rdshade.in | 3rdshade.com",
    aboutUs: "3rdshade is a forward-thinking digital agency that creates impactful content strategies for businesses across industries. We believe in the power of words to transform brands and connect with audiences.",
    roleOverview: "As a Content Writer at 3rdshade, you'll be responsible for creating engaging and SEO-optimized content across various platforms. You'll work with our creative team to develop content strategies that align with our clients' business objectives and brand voice.",
    requirements: [
      "Bachelor's degree in English, Journalism, Communications, or related field",
      "1-3 years of content writing experience (Freshers with exceptional writing skills can apply)",
      "Excellent command over written English",
      "Strong portfolio of published work",
      "Understanding of SEO principles",
      "Ability to adapt writing style for different platforms and audiences"
    ],
    responsibilities: [
      "Create high-quality, engaging content for websites, blogs, and social media",
      "Develop content strategies aligned with client objectives",
      "Research industry trends and topics to create relevant content",
      "Optimize content for SEO and readability",
      "Edit and proofread content for accuracy and consistency",
      "Collaborate with design team for content presentation"
    ],
    bonusSkills: [
      "Experience with content management systems",
      "Knowledge of social media marketing",
      "Basic understanding of HTML",
      "Experience with email marketing",
      "Familiarity with analytics tools"
    ],
    perks: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Creative and collaborative work environment",
      "Regular team activities and events",
      "Work on diverse and challenging projects"
    ]
  },
  "Project Manager": {
    title: "Project Manager",
    description: "Join our team as a Project Manager and lead innovative digital projects from conception to successful delivery while ensuring client satisfaction and team excellence.",
    location: "Pune (On-site)",
    experience: "5+ years",
    salary: "Competitive, based on experience",
    email: "info@3rdshade.in",
    website: "3rdshade.in | 3rdshade.com",
    aboutUs: "3rdshade is a dynamic digital agency delivering cutting-edge solutions across web development, design, and digital marketing. We're known for our innovative approach and commitment to excellence.",
    roleOverview: "As a Project Manager at 3rdshade, you'll lead cross-functional teams in delivering high-impact digital projects. You'll be responsible for project planning, execution, and client communication while ensuring our high standards of quality and innovation are maintained.",
    requirements: [
      "5+ years of project management experience in digital/creative agency",
      "PMP certification or equivalent preferred",
      "Strong experience with agile methodologies",
      "Excellent communication and leadership skills",
      "Proven track record of successful project delivery",
      "Experience with project management tools and methodologies"
    ],
    responsibilities: [
      "Lead end-to-end project lifecycle from planning to delivery",
      "Manage project scope, timeline, budget, and resources",
      "Coordinate with cross-functional teams including designers, developers, and content creators",
      "Ensure project deliverables meet quality standards and client expectations",
      "Conduct regular project status meetings and provide updates to stakeholders",
      "Identify and mitigate project risks proactively",
      "Foster strong client relationships and manage expectations effectively"
    ],
    bonusSkills: [
      "Experience with creative and marketing projects",
      "Knowledge of digital marketing and design processes",
      "Familiarity with web development lifecycle",
      "Experience with client-facing roles",
      "Financial management and budgeting skills"
    ],
    perks: [
      "Competitive salary package",
      "Health insurance coverage",
      "Professional development opportunities",
      "Creative and collaborative work environment",
      "Regular team activities and events",
      "Work on diverse and challenging projects"
    ]
  },
  "Sales Executive": {
    title: "Sales Executive",
    description: "Join our dynamic team as a Sales Executive and drive business growth by building strong client relationships and delivering innovative digital solutions.",
    location: "Pune (On-site)",
    experience: "3+ years",
    salary: "Competitive + Performance Incentives",
    email: "info@3rdshade.in",
    website: "3rdshade.in | 3rdshade.com",
    aboutUs: "3rdshade is a leading digital agency providing comprehensive solutions in web development, design, and digital marketing. We're passionate about helping businesses grow through innovative digital strategies.",
    roleOverview: "As a Sales Executive at 3rdshade, you'll be responsible for driving business growth through new client acquisition and relationship management. You'll work closely with our creative and technical teams to understand client needs and propose effective solutions.",
    requirements: [
      "3+ years of B2B sales experience, preferably in digital/creative agency",
      "Proven track record of meeting and exceeding sales targets",
      "Strong understanding of digital marketing and web services",
      "Excellent communication and presentation skills",
      "Experience with CRM software and sales tools",
      "Strong network in the industry"
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Develop and maintain strong client relationships",
      "Create and present compelling sales proposals",
      "Understand client requirements and recommend appropriate solutions",
      "Collaborate with delivery teams to ensure client satisfaction",
      "Meet or exceed monthly sales targets",
      "Maintain accurate sales records and forecasts"
    ],
    bonusSkills: [
      "Knowledge of digital marketing landscape",
      "Experience in solution selling",
      "Understanding of web development and design processes",
      "Project management skills",
      "Experience with marketing automation tools"
    ],
    perks: [
      "Competitive base salary + commission structure",
      "Health insurance coverage",
      "Professional development opportunities",
      "Creative and collaborative work environment",
      "Regular team activities and events",
      "Work on diverse and challenging projects",
      "Performance-based incentives"
    ]
  }
};
