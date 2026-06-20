import { Hero } from "@/components/home/Hero";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { ProblemStatement } from "@/components/home/ProblemStatement";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { PulseFeature } from "@/components/home/PulseFeature";
import { Integrations } from "@/components/home/Integrations";
import { Differentiators } from "@/components/home/Differentiators";
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
      <Differentiators />
      <Process />
      <CaseStudies />
      <Testimonials />
      <Enterprise />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
