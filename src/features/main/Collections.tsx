import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { Card, CardContent } from '@/components/ui';

export const Collections = () => {
  const { collections, page, sortBy, priceRange } = useCatalogStore();

  const mainCollection = collections.find((c) => c.name.toLowerCase() === 'heart');
  const secondaryCollections = collections
  .filter((c) => c.name.toLowerCase() !== 'heart')
  .slice(0, 4);
  
  return (
    <section className="relative w-full section-indent">
      <div className="container ">
        <h2 className="text-center mb-10">Наші неповторні колекції</h2>

        <div className="w-full h-full flex items-start justify-between lg:gap-5 gap-2">
          {mainCollection && (
            <Card className="lg:w-[649px] w-[175px] lg:h-[790px] h-[214px] shrink-0 group">
              <CardContent className="relative w-full h-full overflow-hidden">
                <div className="flex flex-col w-full h-full items-center bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {mainCollection.products[0]?.images && (
                    <img
                      className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                      src={mainCollection.products[0]?.images[0]?.url}
                      alt={mainCollection.name}
                    />
                  )}

                  <Link
                    to={`${AppRoute.PRODUCTS}${setQueryParams({
                      page,
                      collections: [mainCollection.name],
                      sortBy: sortBy,
                      minPrice: priceRange[0],
                      maxPrice: priceRange[1],
                    })}`}
                    className="w-full text-center absolute left-0 bottom-1 lg:bottom-5 z-20 opacity-100 transition-all duration-300"
                  >
                    <h1 className="w-full text-main text-center">HEART</h1>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="w-full flex flex-wrap gap-1.5 lg:gap-5 items-start justify-between">
            {secondaryCollections.map((collection) => (
              <Card
                key={collection.id}
                className="md:w-[315px] w-[84px] md:h-[385px] h-[104px] shrink-0 rounded-none overflow-hidden group"
              >
                <CardContent className="w-full h-full relative overflow-hidden">
                  <div className="flex flex-col h-full items-center w-full bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {collection.products[0]?.images && (
                      <img
                        className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300"
                        src={collection.products[0]?.images[0]?.url}
                        alt={collection.name}
                      />
                    )}

                    <Link
                      to={`${AppRoute.PRODUCTS}${setQueryParams({
                        page,
                        collections: [collection.name],
                        sortBy: sortBy,
                        minPrice: priceRange[0],
                        maxPrice: priceRange[1],
                      })}`}
                      className="w-full text-center absolute bottom-1 lg:bottom-5 left-0 z-20 opacity-100 transition-all duration-300"
                    >
                      <h1 className="w-full text-main text-center text-[20px] lg:text-heading1">
                        {collection.name}
                      </h1>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
