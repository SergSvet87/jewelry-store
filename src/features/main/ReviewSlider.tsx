import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StarIcon } from 'lucide-react';
import cn from 'classnames';

import 'swiper/css';

import { SliderProps } from '@/types/';
import { Card, CardContent } from '@/components/ui';
import { SlideDataReview } from '@/types/mainSlider';

export const ReviewSlider: FC<SliderProps> = ({ slides, classname, pagination, space, loop }) => {
  const [, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        modules={[]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={classname}
        pagination={pagination}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={space}
        loop={loop}
      >
        {slides &&
          slides.map((slide: SlideDataReview) => (
            <SwiperSlide
              key={slide?.id}
              className="flex justify-center transition-all duration-500"
            >
              {({ isActive }) => (
                <Card
                  className={cn(
                    'transition-all duration-500 ease-in-out bg-transparent mx-auto cursor-pointer',
                    isActive ? 'w-[400px] h-[550px] z-10 shadow-main' : 'w-[306px] h-[460px] opacity-70',
                  )}
                >
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <div
                      className={cn(
                        'flex items-center gap-4 justify-between',
                        isActive ? 'mb-6' : 'mb-5',
                      )}
                    >
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

                    <div className={cn('flex flex-col flex-grow', isActive ? 'mb-6' : 'mb-3')}>
                      <p
                        className={cn(
                          'h-auto overflow-ellipsis overflow-hidden transition-all duration-500 ease-in-out',
                          isActive ? 'max-h-[356px]' : 'max-h-[275px]',
                          slide.hasProductImage && isActive && '!max-h-[125px]',
                          slide.hasProductImage && !isActive && '!max-h-[109px]',
                        )}
                      >
                        {slide.text}
                      </p>

                      {slide.hasProductImage && (
                        <img
                          src={slide.image}
                          alt="Product Image"
                          className={cn(
                            'w-full object-cover',
                            isActive ? 'h-[242px] pt-6' : 'h-[165px] pt-3',
                          )}
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
    </>
  );
};
