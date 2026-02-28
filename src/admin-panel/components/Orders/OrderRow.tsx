import { IFullOrderDetails } from "@/types/orderDetails"
import { OrderStatus } from "./OrderStatus";
import { Icons } from '../../icons';
import { useState , useRef, useEffect} from "react";
import { STATUS_CONFIG } from "@/admin-panel/constants/statusConfig";
import { OrderStatusType } from "@/admin-panel/constants/statusConfig";

interface OrderRowProps {
    order : IFullOrderDetails;
    index : number;
    total : number;
}

export const OrderRow = ({order, index, total} : OrderRowProps) => {

    const [isActive, setIsActive] = useState(false);
    const [orderStatus, setOrderStatus] = useState<OrderStatusType>(order.status as OrderStatusType);

    const menuRef = useRef<HTMLTableCellElement>(null);

    const handleUpdateOrderStatus = (newStatus : OrderStatusType) => {
        setOrderStatus(newStatus)
        setIsActive(false)
    }

    const isLastItems = index >= total -3; 

    const positionClasses = isLastItems 
    ? "bottom-2.5 mb-10 top-auto" 
    : "top-10 mt-2 bottom-auto";

    const fullName = order.orderDetails.firstName || order.orderDetails.lastName === null || undefined || "" 
    ? "Не вказано" 
    : `${order.orderDetails.firstName}, ${order.orderDetails.lastName }`

    const allNamesString = order.items
        .map(item => item.product.name + " " + `"${item.product.collectionName}"`) 
        .join(", "); 

        const productsName = allNamesString.length > 25 
        ? allNamesString.slice(0, 25) + "..." 
        : allNamesString;
        
    const orderData = order.createdAt.slice(0 , 10).replaceAll("-", ".")
    const totalPrice = order.totalPrice.toLocaleString("uk-UA", {
        maximumFractionDigits : 0,
    });

    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if(isActive && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsActive(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[isActive])
    
    return (
        <tr className="transition-colors hover:bg-gray-300 cursor-pointer">

            <td className="pl-8 py-4 ">{order.orderNumber}</td>
            <td className="py-4 w-60 hover:bg-opacity-90">{productsName}</td>
            <td className="py-4 hover:bg-opacity-90 ">{fullName}</td>
            <td className="pl-5 py-4  hover:bg-opacity-90">₴ {totalPrice}</td>
            <td ref={menuRef} className="w-35 py-4 relative text-sm flex items-center justify-between gap-5 hover:bg-opacity-90">
                <OrderStatus
                    status={orderStatus}
                />
                <button 
                    type="button"
                    onClick={() => setIsActive(isActive === true ? false : true)}
                    className={`${isActive ? "rotate-180" : ""} cursor-pointer`}
                >
                    <Icons.arrowDown />
                </button>
                {isActive && (
                    <div className={`absolute left-0 z-10 w-35 bg-white rounded-md shadow-lg border border-gray-100 ${positionClasses}`}>
                        {Object.entries(STATUS_CONFIG)
                        .filter(([key]) => key !== orderStatus)
                        .map(([key, value]) => {
                            const statusKey = key as OrderStatusType;  
                            return (
                                <button 
                                    key={statusKey}
                                    type="button"
                                    className={`w-full text-left px-4 py-2 first:rounded-t-md last:rounded-b-md cursor-pointer ${value.hover}`}
                                    onClick={() => handleUpdateOrderStatus(statusKey)}
                                >
                                    {value.title}
                                </button>
                            );
                            })
                        }
                    </div>
                )}   
            </td>
            <td className="pr-8 py-4 hover:bg-opacity-90">
                {orderData}
            </td>
        </tr>
    );
}