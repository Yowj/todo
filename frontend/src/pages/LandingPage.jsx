import { useEffect } from "react";
import {
  LandingNav,
  Hero,
  Features,
  SocialProof,
  CTA,
  Footer,
  FloatingCTA,
} from "../components/landing";

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      <LandingNav />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LandingPage;
