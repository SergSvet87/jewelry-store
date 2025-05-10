import { FilterIcon } from '@/assets';

export const Filters = () => {
  return (
    <aside className="w-[203px] flex flex-col  gap-8">
      <div className="flex items-center gap-3">
        <img src={FilterIcon} alt="Filter icon" />

        <h4 className='font-body font-[number:500] text-[length:var(--text)] text-[font-style:var(--font-main)] '>Фільтри</h4>
      </div>
    </aside>
  );
};
