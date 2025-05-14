import { categories } from '@/mock';
import { collections } from '@/mock/collections';
import { materials } from '@/mock/mockProducts';
import { ArrowUp, FilterIcon } from '@/assets';

export const Filters = () => {
  return (
    <aside className="w-[203px] flex flex-col gap-8">
      <div className="flex flex-col justify-between ">
        <div className="w-full flex flex-row gap-3">
          <img src={FilterIcon} alt="Filter icon" />

          <h4 className="font-[number:500] text-[length:var(--text)] text-[font-style:var(--font-main)] ">
            Фільтри
          </h4>
        </div>

        <p className="font-[number:400] text-[length:var(--text-second)] text-[var(--grey)]">
          Знайдено <span>22</span> товари
        </p>
      </div>

      <div className="w-full ">
        <div className="w-full flex flex-row justify-between mb-5">
          <span>Категорії</span>

          <span>
            <ArrowUp />
          </span>
        </div>

        <div className="w-full">
          {categories.map((category) => (
            <div key={category.id}>
              <input type="checkbox" name="" id="" />

              <label htmlFor="">{category.title}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full flex flex-row justify-between mb-5">
          <span>Колекції</span>

          <span>
            <ArrowUp />
          </span>
        </div>

        <div className="w-full">
          {collections.map((collection) => (
            <div key={collection.id}>
              <input type="checkbox" name="" id="" />

              <label htmlFor="">{collection.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full flex flex-row justify-between mb-5">
          <span>Матеріал</span>

          <span>
            <ArrowUp />
          </span>
        </div>

        <div className="w-full">
          {materials.map((material, i) => (
            <div key={i}>
              <input type="checkbox" name="" id="" />

              <label htmlFor="">{material}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full ">
        <div className="w-full flex flex-row justify-between mb-5">
          <span>Ціна, грн</span>

          <span>
            <ArrowUp />
          </span>
        </div>

        <div className="w-full">
          <input type="range" name="" id="" />
        </div>
      </div>
    </aside>
  );
};
