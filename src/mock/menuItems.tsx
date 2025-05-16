import { AppRoute } from '@/enums';
import {
  CheckCircleIcon,
  FavoriteIcon,
  HistoryIcon,
  LoyaltyIcon,
  ScalesIcon,
  ShoppingBagIcon,
  MessageIcon
} from '@/assets';

export const menuItems = [
  {
    icon: <CheckCircleIcon stroke="var(--grey)" />,
    text: 'Особисті дані',
    href: AppRoute.USER_DATA,
  },
  {
    icon: <LoyaltyIcon fill="var(--grey)" />,
    text: 'Програма лояльності',
    href: AppRoute.USER_LOYALTY,
  },
  {
    icon: <ShoppingBagIcon stroke="var(--grey)" />,
    text: 'Кошик',
    href: AppRoute.USER_CART,
  },
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
    icon: <FavoriteIcon fill="var(--grey)" />,
    text: 'Список бажань',
    href: AppRoute.USER_FAVORITES,
  },
  {
    icon: <ScalesIcon fill="var(--grey)" />,
    text: 'Список порівнянь',
    href: AppRoute.USER_SCALES,
  },
];
