import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { Button } from '@/components/ui';
import NotFoundImage from '/images/404.png';

export const NotFound = () => {
  return (
    <section className="w-full h-screen section-indent">
      <div className="container h-full flex flex-col items-center justify-center py-20">
        <img src={NotFoundImage} alt="image 404" />

        <p className="max-w-[475px] text-center text-second font-medium mb-9">
          Нам дуже прикро, але сторінку не знайдено. Натомість, ви можете переглянути наші колекції.
        </p>

        <Button className="w-[259px]" asChild>
          <Link to={AppRoute.PRODUCTS}>До каталогу</Link>
        </Button>
      </div>
    </section>
  );
};
