import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'guestId';

export const getOrCreateGuestId = (): string => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

  let guestId = cookies[GUEST_ID_KEY];

  if (!guestId) {
    guestId = uuidv4();
    
    document.cookie = `${GUEST_ID_KEY}=${guestId}; path=/; max-age=${30 * 24 * 60 * 60}`;
  }

  return guestId;
};