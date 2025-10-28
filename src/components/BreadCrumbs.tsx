import { Link } from "react-router-dom";

import { ChevronRight } from "@/assets";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const BreadCrumbs = ({items}: {items: BreadcrumbItem[]}) => {
  return (
    <nav className="flex w-[250px] md:flex md:w-max">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          {i > 0 && <ChevronRight classname="opacity-40"/>}
          {item.href ? (
            <Link to={item.href} className="text-greyhover:text-brown-dark transition-colors duration-800">
              <div className="opacity-70">{item.label}</div>
            </Link>
          ) : (
            <span className="text-brown-dark">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}