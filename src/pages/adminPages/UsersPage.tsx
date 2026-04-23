import { useEffect, useState } from "react"
import { AdminTable } from "@/admin-panel/components/AdminTable"
import SearchIcon from "@/admin-panel/icons/SearchIcon"
import { getAllUsers } from "@/admin-panel/services/getAllUsers"
import { usersHeaders } from "@/admin-panel/constants/tableHeaders"
import { UserRow } from "@/admin-panel/features/users/UserRow"
import { IUserItem } from "@/types/user"

export const UsersPage = () => {

    const [users, setUsers] = useState<IUserItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllUsers();
            console.log("our users : ",result)
            setUsers(result)
        }
        fetchData()
    },[])

    return (
        <div className="mt-20 pl-[30px] pr-15">
           <h3 className="text-[24px]">Користувачі</h3>
           <button 
                className="flex items-center gap-3 text-[#727272] cursor-pointer border py-3 pl-2 mt-15 mb-12 w-full">
                <SearchIcon
            />
                Пошук користувачів
            </button>
            <div className="bg-white p-6" >
                <AdminTable 
                    tableHeaders={usersHeaders} 
                    tableColor="bg-white"
                >
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                        />
                    ))}          
                </AdminTable>
            </div>
        </div>
    )
}