import { useState } from 'react';

import { declension } from '@/utils/declension';
import { materials } from '@/mock/mockProducts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Slider,
  Checkbox,
  Input,
} from '@/components/ui/';
import { useProductStore, useCatalogStore } from '@/store';
import { FilterIcon } from '@/assets';

export const Filters = () => {
  const { products } = useProductStore();
  const {
    selectedCategories,
    selectedCollections,
    selectedMaterials,
    priceRange,
    categories,
    collections,
    setSelectedCategories,
    setSelectedCollections,
    setSelectedMaterials,
    setPriceRange,
    setPage,
  } = useCatalogStore();

  const [inputPriceMin, setInputPriceMin] = useState<string>(priceRange[0].toString());
  const [inputPriceMax, setInputPriceMax] = useState<string>(priceRange[1].toString());

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
    const min = priceRange[0];
    const max = priceRange[1];

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    }
  };

  const handleCategoryChange = (value: string) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updated);
    setPage(1);
  };

  const handleCollectionChange = (value: string) => {
    const updated = selectedCollections.includes(value)
      ? selectedCollections.filter((v) => v !== value)
      : [...selectedCollections, value];

    setSelectedCollections(updated);
    setPage(1);
  };

  // const handleMaterialChange = (value: string) => {
  //   const updated = selectedMaterials.includes(value)
  //     ? selectedMaterials.filter((v) => v !== value)
  //     : [...selectedMaterials, value];

  //   setSelectedMaterials(updated);
  //   setPage(1);
  // };

  return (
    <aside className="w-[203px] flex flex-col gap-8">
      <div className="flex flex-col justify-between ">
        <div className="w-full flex flex-row gap-3">
          <img src={FilterIcon} alt="Filter icon" />

          <h4 className="font-[500] text-second text-brown-dark ">Фільтри</h4>
        </div>

        <p className="text-grey">
          Знайдено <span className="min-w-5">{products.page.totalElements}</span>{' '}
          <span>{declension(products.page.totalElements, ['товар', 'товари', 'товарів'])}</span>
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
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategoryChange(category.name)}
                  />
                  {category.name}
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
                    onCheckedChange={() => handleCollectionChange(collection.name)}
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
