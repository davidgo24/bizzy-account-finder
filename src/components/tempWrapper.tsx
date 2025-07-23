import { ReactNode } from "react";

interface HeroWrapperProps {
  children: ReactNode;
}

export const HeroWrapper = ({ children }: HeroWrapperProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] to-[#cfe3f0] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {children}
      </div>
    </div>
  );
};
