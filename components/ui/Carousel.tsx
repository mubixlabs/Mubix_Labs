"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T> {
  items: T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  scrollToIndex?: number | null;
}

export default function Carousel<T>({
  items,
  keyExtractor,
  renderItem,
  scrollToIndex,
}: CarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setGroupCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const timeout = setTimeout(() => emblaApi.reInit(), 300);
    return () => clearTimeout(timeout);
  }, [emblaApi]);

  // Embla's scrollTo() expects a GROUP index, not a raw slide index.
  // On desktop we scroll 3 slides at a time, so we convert the requested
  // slide index into the correct group before scrolling.
  useEffect(() => {
    if (!emblaApi || scrollToIndex == null) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const groupSize = isDesktop ? 3 : 1;
    const groupIndex = Math.floor(scrollToIndex / groupSize);

    const timeout = setTimeout(() => emblaApi.scrollTo(groupIndex), 50);
    return () => clearTimeout(timeout);
  }, [emblaApi, scrollToIndex]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((item, i) => (
            <div
              key={keyExtractor(item, i)}
              className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_calc(33.333%-1rem)]"
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        className={`absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-zinc-200 bg-white p-2.5 shadow-sm transition-all hover:border-brand-300 lg:flex ${
          !canScrollPrev ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        className={`absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full border border-zinc-200 bg-white p-2.5 shadow-sm transition-all hover:border-brand-300 lg:flex ${
          !canScrollNext ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: groupCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              i === selectedIndex ? "bg-brand-600" : "bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}