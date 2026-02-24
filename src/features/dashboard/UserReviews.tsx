import { useEffect, useState, useCallback } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { getReviews } from '@/services/reviewServics';
import { IOrderItem } from '@/types/orderDetails';
import { ReviewModal } from '@/components/ReviewModal';
import { SuccessPostReviewModal } from '@/components/SuccessPostReviewModal';

interface IReview {
  id: number;
  author: string;
  text: string;
  score: number;
  reviewDate: string;
  createdAt?: string; 
  images: string[];
}

export const UserReviews = () => {
  const { orders, fetchOrders } = useOrderStore();
  const [reviews, setReviews] = useState<Record<string, IReview>>({});
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IOrderItem | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const loadAllReviews = useCallback(async () => {
    setIsReviewsLoading(true);
    try {

      if (orders.length === 0) {
        await fetchOrders();
      }

      const currentOrders = useOrderStore.getState().orders;
      const allItems = currentOrders.flatMap(order => order.items);

      const results = await Promise.all(allItems.map(item => getReviews(item.id)));

      const reviewsMap: Record<string, IReview> = {};
      
      allItems.forEach((item, index) => {
        const data = results[index];
        
        if (data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0) {
          reviewsMap[item.id] = data;
        } else if (Array.isArray(data) && data.length > 0) {
          reviewsMap[item.id] = data[data.length - 1];
        }
      });

      console.log("✅ НОВА МАПА ВІДГУКІВ:", reviewsMap);
      setReviews(reviewsMap);
    } catch (error) {
      console.error("Помилка завантаження відгуків:", error);
    } finally {
      setIsReviewsLoading(false);
    }
  }, [orders.length, fetchOrders]);

  const handleReviewSuccess = () => {
  setIsReviewModalOpen(false); 
  setIsSuccessModalOpen(true);  
};

  useEffect(() => {
    loadAllReviews();
  }, [loadAllReviews]);

  const handleOpenModal = (item: IOrderItem) => {
    setSelectedItem(item);
    setIsReviewModalOpen(true); 
  };

  return (
    <div className="md:mt-[158px] p-4 pl-30 mx-auto">
      {orders.length < 1 ? (
        <span>Ви поки не здійснили жодного замовлення.</span>
      ) : (
        <div>
          {isReviewsLoading && Object.keys(reviews).length === 0 ? (
        <p className="text-center py-10">Завантаження відгуків...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => 
            order.items.map((item) => {
              const review = reviews[item.id];
              const hasReview = review && Object.keys(review).length > 0;

              return (
                <div key={item.id} className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 transition-all hover:shadow-md">
                  <img 
                    src={item.product.images[0]?.url || '/placeholder.png'} 
                    alt={item.product.name} 
                    className="w-24 h-32 object-cover rounded shrink-0" 
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">Колекція: {item.product.collectionName}</p>
                    
                    {hasReview ? (
                      <div className="mt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-500 font-bold flex items-center">
                            {review.score}/5 <span className="ml-1 text-sm">⭐</span>
                          </span>
                          <span className="text-xs text-gray-400">
                            • {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.reviewDate}
                          </span>
                        </div>
                        <p className="text-gray-700 italic leading-relaxed">
                          "{review.text}"
                        </p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Ви ще не залишили відгук про цей товар</p>
                        <button 
                          onClick={() => handleOpenModal(item)} 
                          className="px-6 py-2 bg-black text-white rounded-lg hover:opacity-80 transition-all font-medium"
                        >
                          Залишити відгук ✍️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
        </div>
      )}
     

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onOpenChange={setIsReviewModalOpen}
        items={selectedItem ? [selectedItem] : []}
        onSuccess={handleReviewSuccess}
      />

      <SuccessPostReviewModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        
      />
    </div>
  );
};