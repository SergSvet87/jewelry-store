import { useEffect, useState } from "react";

import { OrderTable } from "@/admin-panel/components/Orders/OrderTable";
import { PeriodSelectDropdown } from "@/admin-panel/components/PeriodSelectDropdown"
import { getOrdersByPeriodService } from "@/admin-panel/services/getOrdersByPeriodService"

export const OrdersPage = () => {

    const [period, setPeriod] = useState("MONTH");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getOrdersByPeriodService(period, 1, 5);
                console.log("Отримані дані з бекенду:", result); 
                setOrders(result.content);
            } catch (error) {
                console.error("Помилка запиту:", error);
            }
        };
        fetchData();
    }, [period]);

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
        </div>
    )
}