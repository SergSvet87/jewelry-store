import { Link } from "react-router-dom";

import { ChevronRight } from "@/assets";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const BreadCrumbs = ({items}: {items: BreadcrumbItem[]}) => {
  return (
    <nav className="flex items-center gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight />}
          {item.href ? (
            <Link to={item.href} className="text-grey hover:text-brown-dark transition-colors duration-800">
              {item.label}
            </Link>
          ) : (
            <span className="text-brown-dark">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}