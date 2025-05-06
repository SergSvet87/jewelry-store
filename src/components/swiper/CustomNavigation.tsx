import { FC, RefObject } from 'react';

interface CustomNavigationProps {
  prevRef: RefObject<HTMLDivElement>;
  nextRef: RefObject<HTMLDivElement>;
}

export const CustomNavigation: FC<CustomNavigationProps> = ({ prevRef, nextRef }) => {
  return (
    <div className="absolute top-1/2 w-full flex justify-between px-10 z-50">
      <div ref={prevRef} className="cursor-pointer text-white text-3xl">
        ←
      </div>
      <div ref={nextRef} className="cursor-pointer text-white text-3xl">
        →
      </div>
    </div>
  );
};
