/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { StarIcon } from 'lucide-react';

import 'swiper/css';

import { Review, SliderProps } from '@/types/';
import { CustomNavigation } from '@/components/swiper';
import { Card, CardContent } from '@/components/Card';

export const ReviewSlider: FC<SliderProps> = ({ slides, classname, pagination, space, loop }) => {
  const [, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={classname}
        pagination={pagination}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={space}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current!,
          nextEl: nextRef.current!,
        }}
        loop={loop}
      >
        {slides &&
          slides.map((slide: Review) => (
            <SwiperSlide key={slide.id} className="flex justify-center transition-all duration-500">
              {({ isActive }) => (
                <Card
                  className={`transition-all duration-500 ease-in-out bg-transparent shadow-lg mx-auto
            ${isActive ? 'w-[400px] h-[550px] z-10' : 'w-[306px] h-[460px] opacity-70'}
          `}
                >
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div className="mb-8 flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map(
                          (_, i) =>
                            slide.rating !== undefined && (
                              <StarIcon
                                key={i}
                                className={`w-5 h-5 ${
                                  slide?.rating ? 'fill-current text-brown-dark' : 'text-brown-dark'
                                }`}
                              />
                            ),
                        )}
                      </div>

                      <p className="text-[var(--grey)]">{slide.date}</p>
                    </div>

                    <div className="mb-6 flex flex-col flex-grow">
                      <p className="mb-6">{slide.text}</p>

                      {slide.hasProductImage && (
                        <img
                          src={slide.image}
                          alt="Product Image"
                          className="w-full h-[248px] object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-start gap-4 pl-5">
                      {slide.avatar && (
                        <img
                          className="w-[70px] h-[70px] rounded-full object-cover"
                          src={slide.avatar}
                          alt={slide.customerName}
                        />
                      )}

                      <div className="flex flex-col gap-1">
                        <p className="text-[length:var(--text)]">{slide.customerName}</p>
                        <p className="text-[var(--grey)]">{slide.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </SwiperSlide>
          ))}
      </Swiper>

      <CustomNavigation prevRef={prevRef} nextRef={nextRef} />
    </>
  );
};
