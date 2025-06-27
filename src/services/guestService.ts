import { v4 as uuidv4 } from 'uuid';

import { localStorageService } from '@/api';

const GUEST_ID_KEY = 'guestId';

const getOrCreateGuestId = (): string => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

  let guestId = cookies[GUEST_ID_KEY];

  if (!guestId) {
    guestId = uuidv4();

    localStorageService.setItem(GUEST_ID_KEY, guestId);

    document.cookie = `${GUEST_ID_KEY}=${guestId}; path=/; max-age=${30 * 24 * 60 * 60}`;
  }

  return guestId;
};

const removeGuestId = () => {
  document.cookie = "guestId=; Max-Age=0; path=/";
};

export {
  getOrCreateGuestId,
  removeGuestId
}