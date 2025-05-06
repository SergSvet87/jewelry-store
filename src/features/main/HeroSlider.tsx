import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { AppRoute } from '../../enums'
import { HeroSliderProps } from '../../types'
import { CustomPagination } from '../../components/swiper'

export const HeroSlider: FC<HeroSliderProps> = ({ slides, classname,loop, autoplay }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 5000, disableOnInteraction: autoplay }}
      loop={loop}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className={classname}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <div className="container pl-[100px]">
              <h1 className="mb-5 max-w-[520px]">{slide.title}</h1>

              <p className=" w-[365px] h-[53px] mb-[40px]">
                {slide.subtitle}
              </p>

              <Link to={AppRoute.PRODUCTS} className='inline-block'>
                <button className="btn-buy">
                    Купити
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="absolute flex w-full items-center justify-center bottom-[10px] z-30 gap-[21px]">
     <CustomPagination total={slides.length} activeIndex={activeIndex} />
    </div>
   </>
  )
}
