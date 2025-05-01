import { categories, companyLinks, socialLinks } from "../mock"

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--brown-dark)] py-16 text-[var(--main)]">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <div className="text-[var(--accent)] text-5xl [font-family:'Aboreto',Helvetica] font-normal">
            JEMMA
          </div>
        </div>

        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <ul className="flex flex-col gap-4">
            {categories.map((category) => (
              <li key={`product-${category.id}`}>
                <a
                  href="#"
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <ul className="flex flex-col gap-4">
            {companyLinks.map((link, index) => (
              <li key={`company-${index}`}>
                <a
                  href="#"
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="w-full md:w-1/4">
          <ul className="flex flex-col gap-4">
            {socialLinks.map((link, index) => (
              <li key={`social-${index}`}>
                <a
                  href="#"
                  className="font-body-small font-[number:var(--body-small-font-weight)] text-main text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer