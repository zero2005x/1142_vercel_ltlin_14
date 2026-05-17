import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const heroImages = [
  '/store/hero1.jpg',
  '/store/hero2.jpg',
  '/store/hero3.jpg',
  '/store/hero4.jpg',
];

function HeroCarousel() {
  return (
    <div className="hidden lg:block">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={image}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image}
                  alt={`store hero ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
}
export default HeroCarousel;
