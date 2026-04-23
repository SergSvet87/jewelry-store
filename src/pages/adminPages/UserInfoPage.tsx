import { useState, useEffect } from "react"
import { IUserItem } from "@/types/user";
import { useParams } from "react-router-dom"
import { getUserById } from "@/admin-panel/services/getAllUsers";
import { AdminTable } from "@/admin-panel/components/AdminTable";
import { ordersHeaders } from "@/admin-panel/constants/tableHeaders";
import { OrderRow } from "@/admin-panel/features/orders/components/OrderRow";

export const UserInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUserItem | null>(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                if(!id) return;
                const data = await getUserById(id);
                setUser(data);
                console.log("дані з беку : ", data)
               
            } catch (error) {
                console.error("user Error : ", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    },[id])

    return (
        <div>
            <ul className="pt-15.5 pl-5">
                <li>bread crumbles</li>
            </ul>
            {isLoading ? (
                "Дані завантажуються"
            ) : (
                <div className="flex flex-col pl-5 pr-15 w-full pt-12">
                    <div className="bg-white rounded">
                    <div className="flex py-2.5 px-6 gap-138">
                        <h3 className="leading-[130%] text-[24px]">Основні дані</h3>
                        <h3 className="leading-[130%] text-[24px]">Додаткові дані</h3>
                    </div>
                    <div className="flex flex-col gap-9.5 pb-9.5">
                        <div className="grid grid-cols-3 pl-8">
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">Ім’я</span>
                            <span>{user?.firstName}</span>
                        </div>
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">Прізвище</span>
                            <span>{user?.lastName}</span>
                        </div>
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">Стать</span>
                            <span>{user?.gender ?? "Не вказано"}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 pl-8">
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">Номер телефону</span>
                            <span>{user?.phone}</span>
                        </div>
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">Електронна пошта</span>
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex flex-col gap-3.5">
                            <span className="text-[#727272]">День народження</span>
                            <span>{user?.birthdate ?? "-"}</span>
                        </div>
                    </div>
                    </div>
                    <div className="flex justify-end py-3 px-6">
                        <button className="px-6 py-2.5 bg-[#5B242A] text-white"> Редагувати </button>
                    </div>
                   </div>
                   <div className="pt-10 pb-29 rounded">
                        <AdminTable 
                            tableHeaders={ordersHeaders.filter((header) => header.label !== "Користувач")} 
                            tableColor="bg-white"
                        >
                        {user?.orders?.map((order, index) => (
                            <OrderRow
                                key={order.id} 
                                order={order} 
                                index={index} 
                                total={user?.orders?.length || 0}
                                showUserColumn={false}
                            />
                        ))}
                        </AdminTable>
                   </div>
                </div>
            )}
        </div>
    )
}