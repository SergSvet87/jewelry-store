import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { ColHeart } from '@/assets';
import { collections } from '@/mock/collections';
import { Card, CardContent } from '@/components/ui';

export const Collections = () => {
  return (
    <section className="relative w-full h-[918px] mb-[var(--section-indent)]">
      <div className="container relative h-full">
        <h2 className="text-center">Наші неповторні колекції</h2>

        <Card className="absolute w-[650px] h-[790px] top-32 left-[60px] overflow-hidden rounded-none group">
          <CardContent className="w-full min-h-[60px] absolute bottom-[22px] left-0 overflow-hidden">
            <div className="flex flex-col h-[790px] items-center justify-end gap-2.5 relative w-full bg-cover bg-center">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              <img
                className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                src={ColHeart}
                alt="Heart Image"
              />

              <Link to={`${AppRoute.PRODUCTS}/collections/heart`} className="w-full text-center absolute left-0 bottom-5 z-20">
                <h1 className="w-full absolute left-0 bottom-5 z-20 opacity-100 transition-all duration-300 text-[var(--main)] text-center">
                  HEART
                </h1>
              </Link>
            </div>
          </CardContent>
        </Card>

        {collections.map((collection) => {
          const id = collection.id;
          return (
            <Card
              key={id}
              className="absolute w-[315px] h-[385px] bg-cover bg-[50%_50%] rounded-none overflow-hidden group"
              style={{
                top: collection?.position.top,
                left: collection?.position.left,
              }}
            >
              <CardContent className="w-full min-h-[60px] absolute bottom-[22px] left-0 overflow-hidden">
                <div className="flex flex-col h-[790px] items-center justify-end gap-2.5 relative w-full bg-cover bg-center">

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  <img
                    className="absolute w-[315px] h-[385px] object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                    src={collection?.image.link}
                    alt={collection.name}
                  />

                  <Link to={`${AppRoute.PRODUCTS}/collections/${id}`} className="w-full min-h-[40px] text-center absolute bottom-5 left-0 z-20">
                    <h1
                      className="w-full text-[var(--main)] text-center"
                      style={{
                        left:
                          id === 'glow'
                            ? '74px'
                            : id === 'moon'
                              ? '70px'
                              : id === 'spark'
                                ? '67px'
                                : id === 'ocean'
                                  ? '63px'
                                  : '67px',
                      }}
                    >
                      {collection?.name}
                    </h1>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
