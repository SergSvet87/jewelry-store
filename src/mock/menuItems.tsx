import { AppRoute } from '@/enums';
import {
  CheckCircleIcon,
  FavoriteIcon,
  HistoryIcon,
  // LoyaltyIcon,
  ScalesIcon,
  MessageIcon
} from '@/assets';

export const menuItems = [
  {
    icon: <CheckCircleIcon stroke="var(--grey)" />,
    text: 'Особисті дані',
    href: AppRoute.USER_DATA,
  },
  // {
  //   icon: <LoyaltyIcon fill="var(--grey)" />,
  //   text: 'Програма лояльності',
  //   href: AppRoute.USER_LOYALTY,
  // },
  {
    icon: <HistoryIcon stroke="var(--grey)" />,
    text: 'Історія замовлень',
    href: AppRoute.USER_ORDERS,
  },
  {
    icon: <MessageIcon stroke="var(--grey)" />,
    text: 'Відгуки',
    href: AppRoute.USER_REVIEWS,
  },
  {
    icon: <FavoriteIcon classname="text-grey" />,
    text: 'Список бажань',
    href: AppRoute.USER_FAVORITES,
  },
  {
    icon: <ScalesIcon classname="text-grey" />,
    text: 'Список порівнянь',
    href: AppRoute.USER_SCALES,
  },
];
