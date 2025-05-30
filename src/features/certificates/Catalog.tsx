import { FC } from 'react';

import { ICertificateItem } from '@/types/';
import { CertificateCard } from './CertificateCard';

interface ICatalogProps {
  data: ICertificateItem[];
}

export const Catalog: FC<ICatalogProps> = ({ data }) => {
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 auto-rows-[282px] gap-5 mb-10">
      {data.map((item) => (
        <article key={item.id} className={''}>
          <CertificateCard item={item} />
        </article>
      ))}
    </div>
  );
};
