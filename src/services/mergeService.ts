// import { ICartItem } from "../types/";
// import { getCartFromLocalStorage, setCartToLocalStorage } from "@/lib/cartStorage";
// import { getFavoritesFromLocalStorage, setFavoritesToLocalStorage } from "@/lib/favoriteStorage";

// export const mergeGuestDataWithUser = async (guestId: string, userId: string) => {
//   const guestCart = getCartFromLocalStorage(guestId);
//   const userCart = getCartFromLocalStorage(userId);

//   const mergedCart = mergeItems(guestCart, userCart);
//   setCartToLocalStorage(userId, mergedCart);

//   const guestFav = getFavoritesFromLocalStorage(guestId);
//   const userFav = getFavoritesFromLocalStorage(userId);

//   const mergedFav = Array.from(new Set([...guestFav, ...userFav]));
//   setFavoritesToLocalStorage(userId, mergedFav);

//   return;
// };

// const mergeItems = (guest: ICartItem[], user: ICartItem[]) => {
  // const mergedMap = new Map<number, ICartItem>();

  // [...user, ...guest].forEach((item) => {
  //   const key = item?.id;
  //   if (mergedMap.has(key)) {
  //     const existing = mergedMap.get(key)!;
  //     mergedMap.set(key, {
  //       ...existing,
  //       quantity: existing.quantity + item.quantity,
  //     });
  //   } else {
  //     mergedMap.set(key, item);
  //   }
  // });

  // return Array.from(mergedMap.values());
// };
