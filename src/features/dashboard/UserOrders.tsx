import cn from 'classnames';

import { Button, Card, CardContent } from '@/components/ui';
import { useOrderStore } from '@/store/useOrderStore';

export const UserOrders = () => {
  const { order, status } = useOrderStore((state) => state);

  return (
    <div className="flex flex-col gap-7 w-full h-auto">
      <h4 className="mt-2">Замовлення</h4>

      <div className="flex flex-col gap-4">
        {order ? (
          order.items.product.map((product) => (
            <Card className={cn('w-full h-[202px] rounded-none')}>
              <CardContent
                className={cn(
                  'relative w-full overflow-hidden flex items-start justify-between gap-6',
                )}
              >
                <div className="w-[202px] h-[202px]">
                  {product.images
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ))
                    .slice(0, 1)}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="">№ {order?.id}</span>

                  <span className="text-grey">{product.name}</span>
                </div>

                <div className="flex flex-col h-[202px] items-end justify-between">
                  <span className="text-button">{status}</span>

                  <Button variant="outline" className="w-[259px]">
                    Залишити відгук
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>У вас немає успішних замовлень</div>
        )}
      </div>
    </div>
  );
};
