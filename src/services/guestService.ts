import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'guestId';

const getOrCreateGuestId = (): number => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

  let guestId = Number(cookies[GUEST_ID_KEY]);

  if (!guestId) {
    guestId = parseInt(uuidv4());

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