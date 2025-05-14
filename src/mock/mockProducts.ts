import { Cert } from '@/assets';
import { ISingleProduct } from '@/types/product';

export const categories = ['Каблучки', 'Підвіски', 'Сережки', 'Браслети', 'Ланцюжки'];
export const collections = ['Heart', 'Infinity', 'Nature', 'Royal', 'Eclipse', 'Moon', 'Glow', 'Ocean', 'Spark'];
const gemstones = ['Діамант', 'Сапфір', 'Рубін', 'Смарагд', 'Аметист'];
export const materials = ['Біле золото', 'Жовте золото', 'Срібло', 'Платина'];
const colors = ['Золотий', 'Срібний', 'Рожеве золото'];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomFloat(min: number, max: number, decimals = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function generateCode(): string {
  return String(Math.floor(250000 + Math.random() * 750000)).padStart(7, '0');
}

export const mockProducts: ISingleProduct[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const category = getRandom(categories);
  const collection = getRandom(collections);
  const gemstoneUsed = Math.random() < 0.8;
  const gemstone = gemstoneUsed ? getRandom(gemstones) : null;
  const name = `${category} з колекції "${collection}"${gemstone ? ` з ${gemstone.toLowerCase()}` : ''}`;

  return {
    id,
    category,
    name,
    price: getRandomFloat(250, 1000),
    image: Cert,
    collection,
    description: `Елегантна прикраса з колекції "${collection}"${gemstone ? `, інкрустована ${gemstone.toLowerCase()}` : ''}.`,
    rating: getRandomFloat(3.5, 5.0, 1),
    material: [getRandom(materials), Math.random() < 0.3 ? getRandom(materials) : undefined].filter(
      Boolean,
    ) as string[],
    color: getRandom(colors),
    weight: getRandomFloat(1.5, 10.0),
    size: category === 'Кільце' ? `${getRandomFloat(15, 20)} мм` : `${getRandomFloat(35, 50)} см`,
    code: generateCode(),
    gemstoneUsed,
    gemstone,
    isLarge: id === 1 || id === 16,
  };
});
