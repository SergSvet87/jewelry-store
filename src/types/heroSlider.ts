interface SlideData {
  background: string
  title: string
  subtitle: string
}

export interface HeroSliderProps {
  slides: SlideData[],
  classname: string,
  pagination?: boolean,
  navigation?: boolean,
  loop?: boolean,
  autoplay?: boolean
  space?: number,
  view?: number
}