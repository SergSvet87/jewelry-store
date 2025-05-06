import { FavoriteIcon, ScalesIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "../assets";
import { AppRoute } from "../enums";

export const headerButtons = [
  {
    title: 'Search',
    href: '#',
    icon: SearchIcon,
    type: 'fill',
  },
  {
    title: 'User',
    href: AppRoute.SIGN_IN,
    icon: UserIcon,
    type: 'fill',
  },
  {
    title: 'Favorite',
    icon: FavoriteIcon,
    href: AppRoute.FAVORITE,
    type: 'fill',
  },
  {
    title: 'Scale',
    href: AppRoute.SCALE,
    icon: ScalesIcon,
    type: 'fill',
  },
  {
    title: 'ShoppingBag',
    icon: ShoppingBagIcon,  
    href: AppRoute.CART,  
    type: 'stroke',
  }
]