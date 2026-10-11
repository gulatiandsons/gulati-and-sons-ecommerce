import OpeningFilm from '@/components/home/OpeningFilm';
import RealHero from '@/components/home/RealHero';
import CollectionsGateway from '@/components/home/CollectionsGateway';
import HousePhilosophy from '@/components/home/HousePhilosophy';
import CuratedSelection from '@/components/home/CuratedSelection';
import FragranceChapter from '@/components/home/FragranceChapter';
import TimepieceChapter from '@/components/home/TimepieceChapter';
import EverydayRitual from '@/components/home/EverydayRitual';
import HouseEdit from '@/components/home/HouseEdit';
import ShopByOccasion from '@/components/home/ShopByOccasion';
import HouseStandard from '@/components/home/HouseStandard';
import PersonalSelection from '@/components/home/PersonalSelection';
import CloserLook from '@/components/home/CloserLook';
import GiftingSection from '@/components/home/GiftingSection';
import CustomerConfidence from '@/components/home/CustomerConfidence';
import HouseJournal from '@/components/home/HouseJournal';
import PrivateCorrespondence from '@/components/home/PrivateCorrespondence';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Section 00: The Opening Film */}
      <OpeningFilm />

      {/* Section 01: The Real Hero */}
      <RealHero />

      {/* Section 02: The Collections */}
      <CollectionsGateway />

      {/* Section 03: The House Philosophy */}
      <HousePhilosophy />

      {/* Section 04: The Curated Selection */}
      <CuratedSelection />

      {/* Section 05: The Fragrance Chapter */}
      <FragranceChapter />

      {/* Section 06: The Timepiece Chapter */}
      <TimepieceChapter />

      {/* Section 07: The Everyday Ritual */}
      <EverydayRitual />

      {/* Section 08: The House Edit */}
      <HouseEdit />

      {/* Section 09: Shop by Occasion */}
      <ShopByOccasion />

      {/* Section 10: The House Standard */}
      <HouseStandard />

      {/* Section 11: The Personal Selection */}
      <PersonalSelection />

      {/* Section 12: A Closer Look */}
      <CloserLook />

      {/* Section 13: Gifting */}
      <GiftingSection />

      {/* Section 14: Customer Confidence */}
      <CustomerConfidence />

      {/* Section 15: The House Journal */}
      <HouseJournal />

      {/* Section 16: Private Correspondence */}
      <PrivateCorrespondence />
    </div>
  );
}
