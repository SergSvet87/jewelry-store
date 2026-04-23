import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_CATEGORY, FILTER_BY_COLLECTION } from "@/admin-panel/constants/filterByDate"
import { ProductList } from "@/admin-panel/features/products/ProductList"
import SearchIcon from "@/admin-panel/icons/SearchIcon"
import { AppRoute } from "@/enums"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { searchQueryService } from "@/admin-panel/services/searchFilterService"

export const ProductsPage = () => {

    // const category = useProductForm((state) => state.formData.categoryName)
    // const collection = useProductForm((state) => state.formData.collectionName)

    const [category, setCategory] = useState("")
    const [collection, setCollection] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
 
   useEffect(() => {
    const timerId = setTimeout(async () => {
        if (searchQuery.length === 0 && !category && !collection) {
            setSearchedProducts([]);
            return;
        }
        const data = await searchQueryService(
            searchQuery,
            category ? [category] : [],     
            collection ? [collection] : []  
        );
        
        setSearchedProducts(data?.content || []); 
    }, 500);

    return () => clearTimeout(timerId);
}, [searchQuery, category, collection]);

    return (
        <div className="mt-20 pl-5 pr-15">
           <div className="flex justify-between ">
                <h3>Товари</h3>
                <Link 
                    to={AppRoute.ADMIN_ADD_NEW_PRODUCT}
                    className="text-[20px] text-white bg-[#5B242A] px-[50px] py-2.5 cursor-pointer"
                >
                    Додати товар
                </Link>
           </div>
           <div className="flex items-baseline justify-between gap-50">
                <div className="flex items-center relative flex-1">
                    <div className="absolute top-18.5 left-3">
                        <SearchIcon/>
                    </div>
                    <input
                        type="text" 
                        className="flex items-center gap-3 text-[#727272] bg-white py-3 pl-11 mt-15 mb-12 w-full" 
                        placeholder="Пошук товарів"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        />
                </div>
                <div className=" flex gap-5">
                    <SelectDropdown
                        value={category}
                        placeholder="Категорія"
                        options={FILTER_BY_CATEGORY}
                        onChange={setCategory}

                    />
                    <SelectDropdown
                        value={collection}
                        placeholder="Колекція"
                        options={FILTER_BY_COLLECTION}
                        onChange={setCollection}

                    />
                </div>
           </div>
           <div className="pb-14">
                <ProductList
                    searchQuery={searchQuery}
                    filteredProducts={searchedProducts}
                    category={category}
                    collection={collection}
                />
           </div>
        </div>
    )
}