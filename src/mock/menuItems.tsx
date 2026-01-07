import { AppRoute } from '@/enums';
import {
  CheckCircleIcon,
  FavoriteIcon,
  // LoyaltyIcon,
  ScalesIcon,
  OrderHistory,
  ReviewsIcon
} from '@/assets';

export const menuItems = [
  {
    icon: <CheckCircleIcon/>,
    text: 'Особисті дані',
    href: AppRoute.USER_DATA,
  },
  // {
  //   icon: <LoyaltyIcon fill="var(--grey)" />,
  //   text: 'Програма лояльності',
  //   href: AppRoute.USER_LOYALTY,
  // },
  {
    icon: <OrderHistory/>,
    text: 'Історія замовлень',
    href: AppRoute.USER_ORDERS,
  },
  {
    icon: <ReviewsIcon/>,
    text: 'Відгуки',
    href: AppRoute.USER_REVIEWS,
  },
  {
    icon: <FavoriteIcon/>,
    text: 'Список бажань',
    href: AppRoute.USER_FAVORITES,
  },
  {
    icon: <ScalesIcon/>,
    text: 'Список порівнянь',
    href: AppRoute.USER_SCALES,
  },
];
