import {
  AboutUs,
  Certificate,
  Collections,
  Discount,
  Hero,
  NewCollection,
  Sale,
  Feedback,
} from '@/features/main';
import { useProductStore } from '@/store';

export const HomePage = () => {
  const { products, loading } = useProductStore();

  return (
    <>
      <Hero />
      <Collections />
      <Discount />
      <NewCollection loading={loading} products={products.content} />
      <Sale loading={loading} products={products.content} />
      <Certificate />
      <AboutUs />
      <Feedback />
    </>
  );
};
