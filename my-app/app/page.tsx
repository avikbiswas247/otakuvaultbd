"use client";

import HeroCarousel from "./uicomponent/Heroslider";
import HomeButton from "./uicomponent/FrontendhomeButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
<HomeButton/>
      <HeroCarousel />
    </main>
  );
}
