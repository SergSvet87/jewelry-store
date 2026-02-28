import { NavLink, Outlet } from "react-router-dom";
import { sidebarMenu } from "../constants/sidebar"

export const AdminLayout = () => {
    return (
        <div className="grid grid-cols-[0.3fr_1fr]">
            <aside className="pt-24 pl-15 pr-10 flex flex-col gap-8 bg-[#F6F6F6] h-screen">
                {sidebarMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink 
                            to={item.path } 
                            key={item.path} 
                            className={({isActive}) => 
                                `flex items-center gap-5 cursor-pointer 
                                ${isActive ? "text-[#5B242A]" : "text-[#727272]" }`}
                            >
                            <Icon/>
                            <span className="text-[20px]">{item.title}</span>
                        </NavLink>
                    )
                })}
            </aside>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}