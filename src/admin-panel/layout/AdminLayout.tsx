import { useEffect, useRef} from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { sidebarMenu } from "../constants/sidebar"
import { useCatalogStore } from "@/store";

export const AdminLayout = () => {

    const { pathname } = useLocation();
    const contentRef = useRef<HTMLDivElement>(null);
    const currentPage = useCatalogStore((state) => state.page);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("🚀 Скролимо все вікно браузера");
    }, [pathname, currentPage]);

    return (
        <div className="grid grid-cols-[0.2fr_1fr] min-h-screen ">
            <aside className="pt-24 pl-15 pr-10 flex flex-col gap-8 bg-[#F6F6F6]">
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
            <div ref={contentRef}>
                <Outlet/>
            </div>
        </div>
    )
}