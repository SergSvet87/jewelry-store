import { Card, CardContent } from '../../components/Card';
import { StarIcon } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/Carousel';
import { reviews } from '../../mock/reviews';

export const Feedback = () => {
  return (
    <section className="w-full py-16 relative">
      <h2 className="text-center font-heading-3 text-brown-dark text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] mb-16">
        Відгуки наших клієнтів
      </h2>

      <div className="max-w-[1168px] mx-auto relative">
        <Carousel className="w-full">
          <CarouselContent className="py-8">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <Card
                  className={`bg-main h-full ${review.hasProductImage ? 'w-[400px] shadow-[3px_5px_12px_#1d110a1a,11px_18px_22px_#1d110a17,26px_41px_29px_#1d110a0d,46px_74px_35px_#1d110a03,71px_115px_38px_transparent]' : 'w-[306px]'}`}
                >
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div className="flex flex-col gap-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-7 h-7 ${i < review.rating ? 'fill-current text-brown-dark' : 'text-brown-dark'}`}
                            />
                          ))}
                        </div>
                        <span className="font-body-small text-grey text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
                          {review.date}
                        </span>
                      </div>

                      <p className="font-body-small text-brown-dark text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-pre-line">
                        {review.text}
                      </p>
                    </div>

                    {review.hasProductImage && (
                      <img
                        className="w-full h-[248px] my-6"
                        alt="Product image"
                        src="/anna-a-model.jpg"
                      />
                    )}

                    <div className="flex items-center gap-4">
                      <img
                        className="w-[70px] h-[70px] rounded-full object-cover"
                        alt={`${review.customerName} avatar`}
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-body text-brown-dark text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)]">
                          {review.customerName}
                        </h3>
                        <span className="font-body-small text-grey text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
                          {review.location}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-transparent border-none hover:bg-transparent" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent border-none hover:bg-transparent" />
        </Carousel>
      </div>
    </section>
  );
};
