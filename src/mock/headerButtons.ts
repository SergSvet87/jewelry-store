import { AppRoute } from '@/enums';
import { FavoriteIcon, MenuIcon, ScalesIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@/assets';

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
    href: AppRoute.USER_FAVORITES,
    type: 'fill',
  },
  {
    title: 'scale',
    href: AppRoute.USER_SCALES,
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

export const headerButtonsMobile = [
  {
    title: 'search',
    href: '#',
    icon: SearchIcon,
    type: 'fill',
  },
  {
    title: 'shoppingBag',
    icon: ShoppingBagIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
  {
    title: 'menuIcon',
    icon: MenuIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
];

export const burgerButtons = [
  {
    title: 'user',
    href: AppRoute.SIGN_IN,
    icon: UserIcon,
    type: 'fill',
  },
  {
    title: 'favorite',
    icon: FavoriteIcon,
    href: AppRoute.USER_FAVORITES,
    type: 'fill',
  },
  {
    title: 'scale',
    href: AppRoute.USER_SCALES,
    icon: ScalesIcon,
    type: 'fill',
  },
]
