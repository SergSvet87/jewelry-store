import { FC } from 'react';
// import Masonry from 'react-masonry-css';

import { Product } from '@/types/';
import ProductCard from '@/features/products/ProductCard';

interface ICatalogProps {
  data: Product[];
  totalPages?: number;
  categoryId?: number;
}

// const breakpointColumnsObj = {
//   default: 4, // 4 колонки на великих екранах
//   1280: 3, // 3 колонки на >=1280px
//   1024: 2, // 2 колонки на >=1024px
//   640: 1, // 1 колонка на мобілках
// };

export const Catalog: FC<ICatalogProps> = ({ data }) => {
  return (
    // <Masonry
    //   breakpointCols={breakpointColumnsObj}
    //   className="catalog-masonry-grid"
    //   columnClassName="catalog-masonry-grid_column"
    // >
    <div className="grid grid-cols-4 gap-5">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    // </Masonry>
  );
};
