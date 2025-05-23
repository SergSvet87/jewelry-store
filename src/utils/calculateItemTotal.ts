// const convertPriceToNumber = (price: string): number =>
//   parseFloat(price.toString().replace(/\s/g, ''));

export const calculateItemTotalPrice = (quantity: number, price: number): number => {
  return quantity * price;
};