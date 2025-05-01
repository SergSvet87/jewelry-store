import { Cert } from "../../assets"

export const Certificate = () => {
  return (
    <section className="relative w-full bg-[100%_100%]">
      <img className="absolute w-full h-full object-cover" src={Cert} alt="Cert Image" />

      <div className="flex flex-col items-center justify-between gap-16">
        <h2 className="text-main  z-50 text-[var(--main)] font-heading-3 font-normal text-[54px] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
          Подарункові сертифікати
        </h2>

        {/* Certificate content would go here */}
        <div className="flex-1 min-h-[600px]">
          {/* This is where certificate images or content would be displayed */}
        </div>

        <button className="px-[50px] py-2.5 bg-[color:var(--button)] backdrop-blur backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(8px)_brightness(100%)]">
          <span className="font-button font-[number:var(--button-font-weight)] text-main text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
            Купити
          </span>
        </button>
      </div>
    </section>
  )
}
