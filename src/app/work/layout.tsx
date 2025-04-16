import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works - 3rdshade",
  description: "Welcome to 3rdshade, your trusted digital agency.",
};

const WorksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      {/* You can add any layout-specific components or styles here */}
      {children}
    </div>
  );
};

export default  WorksLayout; // Default export of the layout component