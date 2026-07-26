"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function HeroCarousel() {
  return (
    <Carousel
      className="w-screen h-[60vh]  md:h-[100vh] md:w-full  sm:h-[100vh] sm:w-full fixed top-[9vh] left-0 right-0 z-0"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="h-full">
        <CarouselItem className="relative h-screen w-full">
          <Image
            src="/images/hero_slide_1.jpg"
            alt="Image 1"
            fill
            className=" object-cover"
            loading="eager"
          />
        </CarouselItem>

        <CarouselItem className="relative h-screen w-full">
          <Image
            src="/images/hero_slide_2.jpg"
            alt="Image 2"
            fill
            className=" object-cover"
          />
        </CarouselItem>
        <CarouselItem className="relative h-screen w-full">
          <Image
            src="/images/hero_slide_3.jpg"
            alt="Image 3"
            fill
            className=" object-cover"
          />
        </CarouselItem>

        <CarouselItem className="relative h-screen w-full">
          <Image
            src="/images/hero_slide_5.jpg"
            alt="Image 3"
            fill
            className=" object-cover"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}