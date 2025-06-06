import { cn } from '@/lib/utils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const CardSkeleton = ({ size = 'small', className }: Props) => {
  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  const cardSize = isLarge
    ? 'lg:w-[650px] w-[361px] lg:h-[828px] h-[399px]'
    : isMedium
      ? 'lg:w-[315px] w-[177px] lg:h-[438px] h-[262px]'
      : 'lg:w-[259px] w-[177px] lg:h-[297px] h-[266px]';

  return (
    <Skeleton
      baseColor="var(--color-accent)"
      className={cn(
        'animate-pulse bg-gray-300 rounded-l flex flex-col justify-between overflow-hidden',
        cardSize,
        className,
      )}
    />
  );
};
