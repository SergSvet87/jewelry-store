import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { uploadReview } from "@/services/reviewServics";
import { useForm } from "react-hook-form";
import { StarIcon } from "lucide-react";
import { useUserStore } from "@/store";
import { IOrderItem } from "@/types/orderDetails";

interface ReviewModalProps {
  isOpen: boolean;
  items: IOrderItem[];
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; 
}

interface IReviewFormValues {
  score: string;
  text: string;
  images: File[];
  productId: string;
}

export const ReviewModal = ({ 
  isOpen, 
  onOpenChange, 
  items, 
  onSuccess 
}: ReviewModalProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.currentUser);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors },  } = useForm<IReviewFormValues>({
  defaultValues: {
    score: "0",
    text: "",
    images: [],
  }
});

  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<IOrderItem | null>(null);

  const [hoverRating, setHoverRating] = useState<number>(0);
  const currentScore = Number(watch("score"));

  useEffect(() => {
    if (items.length === 1 && isOpen) {
      handleProductSelect(items[0]);
    }
  }, [items, isOpen]);

  useEffect(() => {
  if (isOpen && selectedProduct) {
    reset({
      score: "0",
      text: "",
      productId: String(selectedProduct?.product.id || "")
    });
  }
}, [isOpen, selectedProduct, reset]);

  const handleProductSelect = (item: IOrderItem) => {
  setSelectedProduct(item); 
  setValue("productId", String(item.product.id));
  setStep(2);
};

  const handleClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setStep(1);
      setSelectedProduct(null);
    }
  };

const onSubmit = async (data: IReviewFormValues) => {
  const pId = selectedProduct?.product?.id;
  const oId = selectedProduct?.id;

  if (!pId || !oId) {
    console.error("Відсутній ID продукту або замовлення");
    return;
  }

  setIsLoading(true);
    try {
        const response = await uploadReview({
        author: user?.firstName || "Клієнт",
        text: data.text,
        score: data.score,
        productId: String(pId), 
        orderItemId: Number(oId),
        images: [],
    });

    console.log("✅ ВІДПОВІДЬ СЕРВЕРА:", response);

    handleClose(false);

    if (onSuccess) {
      console.log("Намагаюся викликати onSuccess...");
      onSuccess(); // Тепер це спрацює, бо помилки вище більше немає
    }

  } catch (error) {
    console.error("❌ ПОМИЛКА В onSubmit:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[650px] max-w-[95vw] h-auto text-center p-7">
        {step === 1 ? (
          <div className="flex flex-col gap-4">
            <DialogTitle className="text-[16px] font-medium">
              Оберіть товар, на який хочете залишити відгук
            </DialogTitle>
            <div className="flex flex-col gap-4 mt-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleProductSelect(item)}
                  className="cursor-pointer border-0 flex gap-5 w-full p-2 hover:shadow-[0px_10px_10px_rgba(0,0,0,0.1)] transition-shadow rounded-sm"
                >
                  <img 
                    src={item.product.images[0]?.url || '/placeholder.png'} 
                    alt={item.product.name} 
                    className="w-20 h-24 object-cover shrink-0" 
                  />
                  <div className="text-left py-2">
                    <p className="text-[16px] font-medium">
                      {item.product.name} "{item.product.collectionName}"
                    </p>
                  </div>
                </button>
              ))}
              <hr className="mt-5 mb-7" />

              <div className="flex justify-center gap-5">
                <button className="border-1 py-2.5 w-[287px] text-[20px] cursor-pointer">Відмінити</button>
                <button className="bg-button text-white py-2.5 w-[287px] text-[20px] cursor-pointer hover:opacity-90">Продовжити</button>
              </div>
            </div>
          </div>
        ) : (
            <form onSubmit={handleSubmit(
                (data) => {
                    console.log("Валідація пройшла успішно, дані:", data);
                    onSubmit(data);
                },
                (errors) => {
                    console.log("❌ ПОМИЛКА ВАЛІДАЦІЇ ФОРМИ:", errors);
                }
            )}>
            <DialogTitle className="text-[16px] pb-5">
              Залиште свій відгук 
            </DialogTitle>
            
            <div className="flex gap-4 p-2 bg-grey-light/30 rounded-md">
                <img src={selectedProduct?.product.images[0]?.url} className="w-[84px] h-[116px] object-cover" />
                <div className="flex justify-start gap-1 ">
                    <span>{selectedProduct?.product.name}</span>
                    <span>"{selectedProduct?.product.collectionName}"</span>

                </div>
            </div>

            <section className="text-left flex flex-col gap-3 pt-5h">
                <span>Ваша оцінка*</span>
                <div 
                    className="flex gap-1 py-2" 
                    onMouseLeave={() => setHoverRating(0)} 
                    >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                        key={star}
                        type="button"
                        className="cursor-pointer transition-transform hover:scale-110" 
                        onMouseEnter={() => setHoverRating(star)} 
                        onClick={() => setValue("score", String(star))}
                        >
                        <StarIcon 
                            fill={(hoverRating !== 0 ? star <= hoverRating : star <= currentScore) ? "#FFC107" : "none"}
                            stroke={(hoverRating !== 0 ? star <= hoverRating : star <= currentScore) ? "#FFC107" : "#FFCC00"}
                            className="transition-colors duration-200"
                        />
                        </button>
                    ))}
                </div>
                <span className="text-[12px] text-[#727272]">1 - незадовільно, 5 - відмінно</span>
            </section>

            <div className="flex flex-col text-left gap-2">
                <label className="text-sm font-medium pt-5">Ваш відгук*</label>
                <textarea 
                  {...register("text", { required: "Це поле обов'язкове", minLength: 10 })}
                  className="border p-3 h-25 resize-none focus:outline-button text-[12px] rounded-xl"
                  placeholder="Розкажіть про свій досвід користування товаром. Що вам сподобалось або не сподобалось?"
                />
                {errors.text && <span className="text-red-500 text-xs">{errors.text.message}</span>}
            </div>

            <div className="flex justify-between pt-10">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="border w-[287px] py-2.5 hover:bg-grey-light cursor-pointer"
              >
                Відмінити
              </button>
              <button 
                disabled={isLoading}
                type="submit" 
                className="w-[287px] bg-button text-white hover:opacity-90 cursor-pointer"
              >
                Опублікувати
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};