import { HeroSlider } from './HeroSlider';
import { heroSlides } from '@/mock';

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen text-[var(--main)] mb-[var(--section-indent)]">
      <HeroSlider
        slides={heroSlides}
        classname="w-full h-full hero-slider"
        loop={true}
        autoplay={false}
      />
    </section>
  );
};
