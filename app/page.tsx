import { Hero } from "@/components/sections/Hero";
import { CredibilityStrip } from "@/components/sections/CredibilityStrip";
import { SplitNarrative } from "@/components/sections/SplitNarrative";
import { PulseFeatureSection } from "@/components/sections/PulseFeatureSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FeaturedCase } from "@/components/sections/FeaturedCase";
import { FounderBlock } from "@/components/sections/FounderBlock";
import { TableStakesGrid } from "@/components/sections/TableStakesGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <SplitNarrative />
      <PulseFeatureSection />
      <ServicesGrid />
      <ProcessSteps />
      <FeaturedCase />
      <FounderBlock />
      <TableStakesGrid />
      <FinalCTA />
    </>
  );
}
