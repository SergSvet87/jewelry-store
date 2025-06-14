import { FC, useState } from 'react';

import { AppRoute } from '@/enums';
import { ICertificateItem } from '../types/';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Banner } from '@/features/certificates/Banner';
import { Filters } from '@/features/certificates/Filters';
import { Catalog } from '@/features/certificates/Catalog';
import { Sort } from '@/features/certificates/Sort';

interface CertificateLayoutProps {
  certificates: ICertificateItem[];
}

export const CertificateLayout: FC<CertificateLayoutProps> = ({ certificates }) => {
  const [sort, setSort] = useState('popular');

  const filtered = certificates.filter((certificate) => certificate.name.toLowerCase());

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <Banner />

      <div className="container py-10 lg:block hidden">
        <BreadCrumbs
          items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Подарункові сертифікати' }]}
        />
      </div>

      <div className="container flex gap-5 pb-section">
        <Filters />

        <div className="flex flex-col grow gap-7 ">
          <Sort setSort={setSort} sort={sort} />

          {sorted.length > 0 ? <Catalog data={sorted} /> : <div>Certificates not found</div>}
        </div>
      </div>
    </>
  );
};
