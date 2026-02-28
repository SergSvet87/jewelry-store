    import { StatCard } from "@/admin-panel/components/StatCard"
    import { PeriodSelectDropdown } from "@/admin-panel/components/PeriodSelectDropdown"
    import { useState, useEffect } from "react"
    import { dashboardCardStats } from "@/admin-panel/constants/dashboardCartStats"
    import { getOrdersByPeriodService } from "@/admin-panel/services/getOrdersByPeriodService"
    import { OrderTable } from "@/admin-panel/components/Orders/OrderTable"

    export const DashboardPage = () => {

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
            <div className="pt-20 flex flex-col pb-22">
                <div className="flex justify-end pr-15">
                    <PeriodSelectDropdown 
                        value={period}
                        onChange={setPeriod}
                    />
                </div>
                <div className="flex flex-row pl-5 pr-15 pt-9 pb-17.5 gap-11.5">
                    {dashboardCardStats.map((item) => {
                        return (
                            <StatCard 
                                title={item.title}
                                percentage={item.percentage}
                                totalValue={item.totalValue}
                            />
                        )
                    })}
                </div>
                <div className="pl-2.5 pr-12.5">
                    <OrderTable
                        tableTitle="Останні замовлення"
                        orders={orders}
                    />
                </div>
            </div>
        )
    }