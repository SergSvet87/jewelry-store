import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useCartStore } from '@/store/cart/useCartStore';
import { useModalStore } from '@/store/modal/useModalStore';

export const PopUpDeleteFromCart = () => {
  const { openModal, deleteProductId, close } = useModalStore();
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const isOpen = openModal === 'deleteFromCart';

  const handleRemove = () => {
    if (deleteProductId !== null) {
      removeFromCart(deleteProductId);
      close();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogTrigger className="hidden" />
      <DialogContent className="!max-w-[363px] flex flex-col items-center gap-7 p-7">
        <DialogTitle className="w-full text-center text-[length:var(--text)]  font-[500] font-[family-name:var(--font-main)]">
          Ви впевнені, що хочете видалити товар з кошика?
        </DialogTitle>

        <DialogDescription className="hidden" />

        <DialogFooter className="w-full">
          <div className="flex items-center justify-between gap-5">
            <Button variant="outline" className="w-[143px]" onClick={close}>
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
