import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { BestSellersSection } from "@/components/sections/BestSellersSection";
import { StorytellingSection } from "@/components/sections/StorytellingSection";
import { BrewingSection } from "@/components/sections/BrewingSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { SubscriptionSection } from "@/components/sections/SubscriptionSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { WholesaleSection } from "@/components/sections/WholesaleSection";

const Index = () => {
  return (
    <SiteLayout transparentHeader>
      <HeroSection />
      <QuizSection />
      <BestSellersSection />
      <StorytellingSection />
      <BrewingSection />
      <SocialProofSection />
      <SubscriptionSection />
      <JournalSection />
      <WholesaleSection />
    </SiteLayout>
  );
};

export default Index;
