import { AppRoute } from '@/enums';
import { FavoriteIcon, ScalesIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@/assets';

export const headerButtons = [
  {
    title: 'search',
    href: '#',
    icon: SearchIcon,
    type: 'fill',
  },
  {
    title: 'user',
    href: AppRoute.SIGN_IN,
    icon: UserIcon,
    type: 'fill',
  },
  {
    title: 'favorite',
    icon: FavoriteIcon,
    href: AppRoute.FAVORITE,
    type: 'fill',
  },
  {
    title: 'scale',
    href: AppRoute.SCALE,
    icon: ScalesIcon,
    type: 'fill',
  },
  {
    title: 'shoppingBag',
    icon: ShoppingBagIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
];
