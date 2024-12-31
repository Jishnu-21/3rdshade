import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service - 3rdshade",
  description: "Welcome to 3rdshade, your trusted digital agency.",
};

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* You can add any layout-specific components or styles here */}
      {children}
    </div>
  );
};

export default ServicesLayout; // Default export of the layout component