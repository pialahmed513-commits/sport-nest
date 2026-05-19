import ClientTestimonials from "@/components/ClientTestimonials";
import HeroSection from "@/components/HeroSection";
import SportsCategories from "@/components/SportsCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection></HeroSection>
      <SportsCategories></SportsCategories>
      <WhyChooseUs></WhyChooseUs>
      <ClientTestimonials></ClientTestimonials>
    </div>
  );
}
