import { Hero } from "@/components/home/Hero";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { ProblemStatement } from "@/components/home/ProblemStatement";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { PulseFeature } from "@/components/home/PulseFeature";
import { Integrations } from "@/components/home/Integrations";
import { BuiltForReality } from "@/components/home/BuiltForReality";
import { Differentiators } from "@/components/home/Differentiators";
import { PullQuote } from "@/components/home/PullQuote";
import { Process } from "@/components/home/Process";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Testimonials } from "@/components/home/Testimonials";
import { Enterprise } from "@/components/home/Enterprise";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <ProblemStatement />
      <SolutionsGrid />
      <PulseFeature />
      <Integrations />
      <div className="cv-auto">
        <BuiltForReality />
      </div>
      <Differentiators />
      <PullQuote />
      {/* below-the-fold: skip offscreen render work until near the viewport */}
      <div className="cv-auto">
        <Process />
      </div>
      <div className="cv-auto">
        <CaseStudies />
      </div>
      <div className="cv-auto">
        <Testimonials />
      </div>
      <div className="cv-auto">
        <Enterprise />
      </div>
      <div className="cv-auto">
        <HomeFAQ />
      </div>
      <div className="cv-auto">
        <FinalCTA />
      </div>
    </>
  );
}
