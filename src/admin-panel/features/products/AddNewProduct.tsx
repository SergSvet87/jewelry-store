import { useProductForm } from "@/admin-panel/hooks/useProductForm"
import { AddNewProductStart } from "./AddNewProductStart"
import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_CATEGORY, FILTER_BY_COLLECTION } from "@/admin-panel/constants/filterByDate"
import { AddPhoto } from "./AddPhoto"
import { Checkbox } from "@/components/ui"
import { AddNewProductRing } from "./AddNewProductRing"
import { AddNewProductSerezhki } from "./AddNewProductSerezhki"

interface AddNewProductProps {
    disabled : boolean;
}

export const AddNewProduct = ({disabled} : AddNewProductProps) => {

    const category = useProductForm((state) => state.formData.categoryName);
    const collection = useProductForm((state) => state.formData.collectionName);
    const updateField = useProductForm((state) => state.updateField);
    const isNew = useProductForm((state) => state.formData.isNew)

    console.log("category :", category )
    console.log(typeof category)
    fetch('/api/categories')
        .then(res => res.json())
        .then(data => console.table('категоріяяяя :',data))
        .catch(err => console.error('Помилка:', err));

    return (
        <div className="pl-5 pt-[62px] grid grid-cols-[1fr_1fr] gap-x-[131px] gap-y-12">
            <div>
                <span>breads crumble</span>
                <h3 className="pl-[9px] mt-5">Новий товар</h3>
                <p className="mt-12 mb-7 text-[20px]">Основна інформація</p>
                <div>
                    <div className="flex flex-row pt-2 gap-15 w-full">
                        <section className="flex flex-col gap-2">
                            <span className="text-[#5B242A]">Категорія*</span>
                            <SelectDropdown
                                options={FILTER_BY_CATEGORY}
                                onChange={(val) => updateField('categoryName', val)}
                                value={category}
                                placeholder="Оберіть категорію"
                            />
                        </section>
                        <section className="flex flex-col gap-2 ">
                            <span className={!category ? "text-[#727272]" : "text-[#5B242A]"}>Колекція*</span>
                                <SelectDropdown
                                    options={FILTER_BY_COLLECTION}
                                    onChange={(val) => updateField('collectionName', val)}
                                    value={collection}
                                    placeholder="Оберіть колекцію"
                                    disable={!category}
                                    
                                />
                        </section>
                    </div>
                    {!category ? (
                        <div>
                            <AddNewProductStart disabled={true}/>
                        </div>
                    ):(
                        <div>
                            <AddNewProductStart disabled={false} />
                             <section className="flex flex-row mt-8 gap-3">
                                <Checkbox
                                    checked={isNew}
                                    onCheckedChange={(checked: boolean) => updateField('isNew', checked)}
                                />
                                <span className="text-[#5B242A]">Новинка</span>
                            </section>
                            <p className="mt-12 mb-7 text-[20px]">Характеристики</p>
                        </div>
                    )}
                    
                    {(category === "Каблучки" || category === "Ланцюжки") && (
                        <AddNewProductRing/>
                    )}

                    {(category === "Сережки" || category === "Підвіски" || category === "Браслети") && (
                        <AddNewProductSerezhki/>
                    )}
                </div>
            <button className="bg-[#5B242A] text-white w-[190px] h-[30px] mt-16 cursor-pointer">Імпортувати з Excel</button>

            </div>
            <div className="pb-5 mt-[116px]">
               <AddPhoto
                    id="main-photo"
                    isMain={true}
                    disable={!category}
               />
            </div>
            <div>
                {/* не видаляти. потірбно для гріда */}
            </div>
            {category ? (
                <div className=" flex flex-col  pb-[138px]">
                    <div className="flex gap-5">
                        <button className={`${!disabled 
                        ? "text-[#727272] cursor-default" 
                        : "cursor-pointer"} 
                        border py-2.5 w-[204px] `}
                        >
                            Скасувати
                        </button>
                        <button className={`${!disabled 
                            ? "text-white bg-[#727272] border-[#727272] cursor-default" 
                            : "text-white bg-button cursor-pointer"} 
                            border py-2.5 w-[204px]`}
                        >
                            Додати товар
                        </button>
                    </div>
                    <button className={`${!disabled 
                        ? "text-[#727272] cursor-default" 
                        : " cursor-pointer"} 
                        border py-2.5 w-[427px] mt-7`}
                    >
                        Зберегти як чернетку
                    </button>
                </div>
            ):
            ( <div className="pt-12">
                <div className="flex gap-5">
                    <button className={`${disabled 
                    ? "text-[#727272] cursor-default" 
                    : "cursor-pointer"} 
                    border py-2.5 w-[204px] `}
                    >
                        Скасувати
                    </button>
                    <button className={`${disabled 
                        ? "text-white bg-[#727272] border-[#727272] cursor-default" 
                        : "text-white bg-button cursor-pointer"} 
                        border py-2.5 w-[204px]`}
                    >
                        Додати товар
                    </button>
                </div>
                <button className={`${disabled 
                    ? "text-[#727272] cursor-default" 
                    : " cursor-pointer"} 
                    border py-2.5 w-[427px] mt-7 mb-[240px]`}
                >
                    Зберегти як чернетку
                </button>
            </div>)
            }
        </div>
    )
}