import { StatCard } from "@/admin-panel/components/StatCard"
import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { useState, useEffect } from "react"
import { getOrdersByPeriodService } from "@/admin-panel/services/getOrdersByPeriodService"
import { AdminTable } from "@/admin-panel/components/AdminTable"
import { ordersHeaders } from "@/admin-panel/constants/tableHeaders"
import { Icons } from "@/admin-panel/icons"
import { FILTER_BY_DATA } from "@/admin-panel/constants/filterByDate"
import { formatCurrency } from "@/utils/formattersUAH"
import { getTotalRevenue, getTotalOrders, getTotalProducts, getTotalUsers} from "@/admin-panel/services/dashBoardStatsService"
import { OrderRow } from "@/admin-panel/features/orders/components/OrderRow"
import { IFullOrderDetails } from "@/types/orderDetails"

export const DashboardPage = () => {

    const [period, setPeriod] = useState("MONTH");
    const [orders, setOrders] = useState<IFullOrderDetails[]>([]);
    const [revenue, setRevenue] = useState<number | string>(0)
    const [totalOrdersCount, setTotalOrdersCount] = useState <number | string>(0)
    const [totalPages, setTotalPages] = useState<number | string>(0)
    const [totalUsers, setTotalUsers] = useState<number | string>(0)

    useEffect(() => {
       const fetchTotalOrdersCount = async () => {
        const data = await getTotalOrders(period, 0, 1)
        setTotalOrdersCount(data.page.totalElements) 
        console.log("Інформація про сторінки:", data.page)
       } 
       fetchTotalOrdersCount()
    },[period])

    useEffect(() => {
        const fetchTotalProducts = async () => {
            const data = await getTotalProducts()
            setTotalPages(data.page.totalElements)
        }
        fetchTotalProducts()
    },[period])

    useEffect(() => {
        const fetchTotalUsers = async () => {
            const data = await getTotalUsers()
            setTotalUsers(data.length)
        }
        fetchTotalUsers()
    },[period])

    useEffect(() => {
        const fetchRevenue = async () => {
            const data = await getTotalRevenue(period)
            setRevenue(data);
        }
        fetchRevenue()
    },[period])

    useEffect(() => {
        const fetchData = async () => {
            try {
            const result = await getOrdersByPeriodService(period, 0 ,6);
            console.log("Отримані дані з бекенду:", result); 
            setOrders(result.content);
            } catch (error) {
                console.error("Помилка запиту:", error);
            }
        };
        fetchData();
    }, [period]);

    const dashboardCardStats = [
        {
            title: "Загальний дохід",
            percentage: "+9%",
            totalValue: formatCurrency(revenue)
        },
        {
            title: "Замовлення",
            percentage: "+7%",
            totalValue: totalOrdersCount
        },
        {
            title: "Товари",
            percentage: "+4",
            totalValue: totalPages
        },
        {
            title: "Користувачі",
            percentage: "+5%",
            totalValue: totalUsers
        },
    ];

    return (
        <div className="pt-20 flex flex-col pb-22">
            <div className="flex justify-end pr-15">
                <SelectDropdown
                    options={FILTER_BY_DATA}
                    value={period}
                    onChange={setPeriod}
                    icon={<Icons.calendar/>}
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
               <AdminTable 
                    tableHeaders={ordersHeaders} 
                    tableColor="bg-white"
                >
                    {orders.map((order, index) => (
                        <OrderRow 
                            key={order.id} 
                            order={order} 
                            index={index} 
                            total={orders.length}
                            showUserColumn={true}
                        />
                    ))}
                </AdminTable>
            </div>
        </div>
    )
}