import { useCompareStore } from '@/store/useCompareStore';

export const UserCompareProducts = () => {

  const compareItems = useCompareStore((state) => state.compareItems);

  return (
    <div className="container leading-[130%] pb-16">
      <h2 className='mb-12 mt-9 text-center text-[20px] text-button'>Порівняння товарів</h2> 

      <h2 className='text-[16px] text-button text-center pb-3 font-main'>Метал</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.categoryName}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>{item.description?.characteristic.metal}</span>
        </div>
      </div>
      ))}

       <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Колір металу</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.categoryName}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>{item.description?.characteristic.color}</span>
        </div>
      </div>
      ))}

        <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Середня вага</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.categoryName}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>~{item.description?.characteristic.averageWeight}</span>
        </div>
      </div>
      ))}

      <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Розміри</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
             <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.categoryName}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <div className='flex flex-col gap-1 flex-shrink-0 text-end'>
            <span className='text-[16px]'>ширина {item.description?.characteristic.size.width} мм</span>
            <span className='text-[16px]'>висота {item.description?.characteristic.size.height} мм</span>
            <span className='text-[16px]'>довжина {item.description?.characteristic.size.length} мм</span>
          </div>
        </div>
      </div>
      ))}

      <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Камінь</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.categoryName}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <div className='flex flex-col gap-1 flex-shrink-0 text-end'>
            <span className='text-[16px]'>{item.description?.characteristic.stone}</span>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default UserCompareProducts;