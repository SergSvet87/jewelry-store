import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { AppRoute } from '@/enums';
import { ICertificateItem } from '../types/';
import { Card, CardContent, CardFooter } from './ui';
import { FavoriteFilledIcon, FavoriteIcon, } from '@/assets';
import { useCertificateStore } from '@/store';

interface CertificateCardProps {
  certificate: ICertificateItem;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  isHidden?: boolean;
}

export const CertificateCard = ({ certificate, size = 'small', className, isHidden }: CertificateCardProps) => {
  const setFavorites = useCertificateStore((state) => state.setFavorites);
  const favorites = useCertificateStore((state) => state.favorites);

  const isFavorite = favorites.includes(certificate.id);

  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  return (
    <Card
      className={cn(
        'group relative border-0 overflow-hidden flex flex-col justify-between transition-all',
        isLarge
          ? 'lg:w-[650px] w-[361px] lg:h-[828px] h-[399px]'
          : isMedium
            ? 'lg:w-[315px] w-[176px] lg:h-[438px] h-[262px]'
            : 'lg:w-[259px] w-[177px] lg:h-[297px] h-[266px]',
        className,
      )}
    >
      <CardContent
        className={cn(
          'flex flex-col items-center justify-end gap-2.5 relative flex-1 shrink-0 mb-3 overflow-hidden border-0 w-full bg-cover bg-center',
          isLarge
            ? 'lg:h-[593px] h-[383px]'
            : isMedium
              ? 'lg:h-[400px] h-[244px]'
              : 'lg:h-[276px] h-[244px]',
        )}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

        <img
          className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
          src={certificate.image}
          alt={certificate.name}
        />

        <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
          <button className="btn w-6 h-6" onClick={() => setFavorites(certificate.id)}>
            {isFavorite ? (
              <FavoriteFilledIcon classname="w-6 h-6" />
            ) : (
              <FavoriteIcon classname="w-6 h-6 text-brown-dark" />
            )}
          </button>
        </div>

        <Link
          to={AppRoute.CERTIFICATE.replace(':id', certificate.id.toString())
            .replace(':title', certificate.name)}
          className="absolute lg:bottom-5 bottom-4 z-5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300"
        >
          <button className="btn-buy">Купити</button>
        </Link>
      </CardContent>

      {isHidden ? null : (
        <CardFooter className="flex justify-between items-center font-medium text-brown-dark">
          <span className="">{certificate.price} грн</span>
        </CardFooter>
      )}
    </Card>
  );
};
