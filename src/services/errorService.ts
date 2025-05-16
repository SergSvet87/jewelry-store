export const catchErrorCodes = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) return 'Unknown error';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axiosError = error as any;

  if (axiosError.response?.status) {
    const code = axiosError.response.status;
    switch (code) {
      case 400:
        return 'Невірні дані';
      case 401:
        return 'Сесія закінчилась. Увійдіть знову';
      case 403:
        return 'Недостатньо прав доступу';
      case 404:
        return 'Не знайдено';
      case 500:
        return 'Серверна помилка';
      default:
        return `Сталася помилка: ${code}`;
    }
  }

  return 'Невідома помилка';
};
