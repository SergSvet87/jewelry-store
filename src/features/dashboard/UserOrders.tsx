import { useEffect } from "react";
import { useOrderStore } from "@/store";

export const UserOrders = () => {

  const { orders, fetchOrders } = useOrderStore() 

  const dateChanger = (date :string) => {
    const dataObj = new Date(date).toLocaleDateString('uk-UA', {
      day : "numeric",
      month : "long",
      year : "numeric"
    })
    return dataObj.replace(/\s*р\.?$/, "");
  }
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  const orderStatusMap: Record<string, string> = {
  PENDING: 'В очікуванні',
  DONE: 'Виконано',
  CANCELLED: 'Скасовано',
  SHIPPED: 'Відправлено',
};

const getStatusLabel = (status: string) => {
  return orderStatusMap[status] || status;
};

  console.log("Дані замовлень у сторі:", orders);

  return (
    <>
      <h2 className="text-button text-[20px] text-center p-8">Історія Замовлень</h2>
      {orders.map((item) => (
        <div key={item.id} className="container">
          <div className="flex justify-between items-baseline pb-3">
            <span className="text-[20px] font-normal">
              Замовлення № {item.orderNumber.slice(-4)}
            </span>
            <span className="text-[16px] text-[#727272]">
              {dateChanger(item.createdAt)}
            </span>
          </div>
          
          <span className="text-[16px] text-button">
            {getStatusLabel(item.status)}
          </span>

          <img 
            src={item.items[0].product.images[0].url} 
            alt="Замовлений товар"
            className="w-2/5 pt-3"
            />

          <div className="flex gap-1 py-1">
            <span>{item.items[0].product.categoryName}</span>
            <span>"{item.items[0].product.collectionName}"</span>
          </div>

          <span className="text-button text-[16px]">
            {item.items[0].product.price.normalPrice} грн
          </span>

          <div className=" flex flex-col gap-4 pt-5 pb-16">
            
              {item.isGift && (  
                <div className="flex justify-between">
                  <span>Подарункове пакування</span>
                  <span className="text-button">{"240 грн"}</span>
                </div>
              )}

            <div className="flex justify-between">
              <span>Послуги доставки </span>
              <span className="text-button">0 грн</span>
            </div>

            <div className="flex justify-between text-[16px] font-medium">
              <span>Разом </span>
              <span className="text-button">{item.isGift ? item.totalPrice + 240 + " грн" : item.totalPrice + ' грн'}</span>
            </div>
          </div>

        <button className="w-full border-1 p-3 text-[16px] mb-21">Залишити відгук</button>
          
        </div>
      ))}
    </>
  )

};