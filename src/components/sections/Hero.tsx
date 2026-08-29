import { getProfile } from "@/lib/about";
import HeroContent from "@/components/sections/HeroContent";

export default async function Hero() {
  const profile = await getProfile();
  return <HeroContent profile={profile} />;
}
