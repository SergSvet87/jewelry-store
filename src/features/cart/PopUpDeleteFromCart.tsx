import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useCartStore, useModalStore } from '@/store';

export const PopUpDeleteFromCart = () => {
  const { openModal, deleteProductId, backToCart } = useModalStore();
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const isOpen = openModal === 'deleteFromCart';

  const handleRemove = () => {
    if (deleteProductId !== null) {
      removeFromCart(deleteProductId);
      backToCart();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => backToCart()}>
      <DialogTrigger className="hidden" />
      <DialogContent className="!max-w-[363px] z-[9955] flex flex-col items-center gap-7 p-7 !shadow-main">
        <DialogTitle className="w-[250px] text-center text-text font-[500] font-main">
          Ви впевнені, що хочете видалити товар з кошика?
        </DialogTitle>

        <DialogDescription className="hidden" />

        <DialogFooter className="w-full">
          <div className="flex items-center justify-between gap-5">
            <Button variant="outline" className="w-[143px]" onClick={backToCart}>
              Ні
            </Button>

            <Button className="w-[143px]" onClick={handleRemove}>
              Так
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
