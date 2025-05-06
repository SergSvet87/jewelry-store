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

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Collections />
      <Discount />
      <NewCollection />
      <Sale />
      <Certificate />
      <AboutUs />
      <Feedback />
    </>
  );
};
