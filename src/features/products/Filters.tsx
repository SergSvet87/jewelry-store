import { useEffect, useMemo, useState } from 'react';

import { categories } from '@/mock';
import { collections } from '@/mock/collections';
import { materials, mockProducts } from '@/mock/mockProducts';
import { FilterIcon } from '@/assets';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Slider,
  Checkbox,
  Input,
} from '@/components/ui/';
import { useProductStore } from '@/store/useProductStore';
import { filterProducts } from '@/utils/filterProducts';
import { declension } from '@/utils/declension';

export const Filters = () => {
  const { setProducts } = useProductStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 36225]);
  const [inputPriceMin, setInputPriceMin] = useState('20');
  const [inputPriceMax, setInputPriceMax] = useState('36225');

  const filteredProducts = useMemo(() => {
    return filterProducts(mockProducts, {
      selectedCategories,
      selectedCollections,
      selectedMaterials,
      priceRange,
    });
  }, [selectedCategories, selectedCollections, selectedMaterials, priceRange]);

  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts, setProducts]);

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void,
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handlePriceInputChange = () => {
    const min = Number(inputPriceMin);
    const max = Number(inputPriceMax);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    }
  };

  return (
    <aside className="w-[203px] flex flex-col gap-8">
      <div className="flex flex-col justify-between ">
        <div className="w-full flex flex-row gap-3">
          <img src={FilterIcon} alt="Filter icon" />

          <h4 className="font-[500] text-second text-brown-dark ">
            Фільтри
          </h4>
        </div>

        <p className="text-grey">
          Знайдено <span className='min-w-5'>{filteredProducts.length}</span> <span>{declension(filteredProducts.length, ['товар', 'товари', 'товарів'])}</span>
        </p>
      </div>

      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-8"
        defaultValue={['categories', 'collections', 'material', 'price']}
      >
        <AccordionItem value="categories" className="border-none ">
          <AccordionTrigger className="p-0 hover:no-underline mb-5">
            <span className="">Категорії</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCategories.includes(category.title)}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        category.title,
                        selectedCategories,
                        setSelectedCategories,
                      )
                    }
                  />
                  {category.title}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="collections" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5">
            <span className="">Колекції</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {collections.map((collection) => (
                <label key={collection.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCollections.includes(collection.name)}
                    onCheckedChange={() =>
                      handleCheckboxChange(
                        collection.name,
                        selectedCollections,
                        setSelectedCollections,
                      )
                    }
                  />
                  {collection.name}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5">
            <span className="">Матеріал</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {materials.map((material) => (
                <label key={material} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() =>
                      handleCheckboxChange(material, selectedMaterials, setSelectedMaterials)
                    }
                  />
                  {material}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5">
            <span className="">Ціна, грн</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className=" w-full ">
              <form className="w-full flex flex-col items-start gap-4">
                <div className="w-full flex justify-between items-center gap-1">
                  <Input
                    className="w-[60px] h-[30px] px-1 py-[7px] text-left border border--grey"
                    type="text"
                    name="inputPriceMin"
                    id="inputPriceMin"
                    value={inputPriceMin}
                    onChange={(e) => setInputPriceMin(e.target.value)}
                  />
                  <span>-</span>
                  <Input
                    className="w-[60px] h-[30px] px-1 py-[7px] text-end border border-grey"
                    type="text"
                    name="inputPriceMax"
                    id="inputPriceMax"
                    value={inputPriceMax}
                    onChange={(e) => setInputPriceMax(e.target.value)}
                  />
                  <button
                    className="w-[60px] h-[30px] p-0 btn-buy"
                    type="button"
                    onClick={handlePriceInputChange}
                  >
                    Ok
                  </button>
                </div>

                <Slider
                  name="priceRange"
                  min={0}
                  max={40000}
                  step={5}
                  value={priceRange}
                  onValueChange={(val) => {
                    setPriceRange(val as [number, number]);
                    setInputPriceMin(val[0].toString());
                    setInputPriceMax(val[1].toString());
                  }}
                />
              </form>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
