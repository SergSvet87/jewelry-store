import { useEffect, useState } from "react";

import { OrderTable } from "@/admin-panel/components/Orders/OrderTable";
import { PeriodSelectDropdown } from "@/admin-panel/components/PeriodSelectDropdown"
import { getOrdersByPeriodService } from "@/admin-panel/services/getOrdersByPeriodService"
import { Pagination } from "@/features/products/Pagination"
import { getQueryParams, setQueryParams } from '@/utils/urlParams';
import { useSearchParams } from "react-router-dom";

interface PaginationData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const OrdersPage = () => {
    

    const [period, setPeriod] = useState("MONTH");
    const [pagination, setPagination] = useState<PaginationData>({
        number: 0,
        size: 9,
        totalElements: 0,
        totalPages: 0
    });
    const [currentPage, setCurrentPage] = useState(0)
    const [orders, setOrders] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();


      const handlePageChange = (clickedPage: number) => {
        const backendPage = clickedPage - 1;
        setCurrentPage(backendPage)
    
        setSearchParams(
          setQueryParams({
            ...getQueryParams(searchParams),
            page: clickedPage,
          }),
        );
      };
      
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const result = await getOrdersByPeriodService(period, currentPage, 9);
                    console.log("Отримані дані з бекенду:", result); 
                    setOrders(result.content);
                    setPagination(result.page)
                    console.log("пагінація :", result.page)
                } catch (error) {
                    console.error("Помилка запиту:", error);
                }
            };
            fetchData();
        }, [period, currentPage]);

    return (
        <div className="mt-20">
            <div className="flex items-center justify-between pl-5 pr-15">
                <div>bread crumble</div>
                <PeriodSelectDropdown
                    value={period}
                    onChange={setPeriod}
                />
            </div>
            <div className="pl-2.5 pr-12.5 pt-12.5">
                <OrderTable
                    tableTitle="Історія замовлень"
                    orders={orders}
                />
            </div>
            <Pagination 
                totalPages={pagination.totalPages}
                currentPage={currentPage + 1}
                onChange={(p: number) => handlePageChange(p)}
            />
        </div>
    )
}