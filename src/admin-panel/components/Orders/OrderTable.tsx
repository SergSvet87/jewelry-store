import { IFullOrderDetails } from "@/types/orderDetails";
import { OrderRow } from "./OrderRow";

interface OrderTableProps {
    tableTitle : string;
    orders : IFullOrderDetails[];
}

export const OrderTable = ({tableTitle, orders} : OrderTableProps) => {
    return (
        <div className="bg-[#F6F6F6] leading-[130%] rounded-xl overflow-hidden">
            <div className="pl-2 text-[24px] pt-3 font-serif">{tableTitle}</div>
            <table className="w-full text-left">
                <thead className="text-[#727272] text-[14px] ">
                    <tr>
                        <th className="pl-8 pt-4 font-normal">ID замовлення</th>
                        <th className="pt-4 font-normal">Назва товару</th>
                        <th className="pt-4 pr-9 font-normal">Користувач</th>
                        <th className="pl-5 pt-4 font-normal">Сума</th>
                        <th className="pl-8 pt-4 font-normal">Статус</th>
                        <th className="pt-4 font-normal">Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((item, index) => (
                        <OrderRow 
                            key={item.id} 
                            order={item}
                            index={index} 
                            total={orders.length}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}