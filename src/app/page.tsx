import HeroPage from "@/components/Hero";
import HomeUpcomingEvent from "@/components/HomeUpcomingEvent";
import ImpactStats from "@/components/ImpactStats";

export default function Home() {
  return (
    <div className="">
      <HeroPage />
      <ImpactStats />
      <HomeUpcomingEvent />
    </div>
  );
}
