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
        <div key={i} className="flex items-center gap-2 capitalize">
          {i > 0 && <ChevronRight />}
          {item.href ? (
            <Link to={item.href} className="text-[var(--grey)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--brown-dark)]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
