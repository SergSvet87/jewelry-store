import { Cert } from "../../assets"

export const Certificate = () => {
  return (
    <section id="certificate" className="relative w-full h-[1000px] bg-cover bg-center" style={{ backgroundImage: `url(${Cert})` }}>

      <div className="w-full h-full flex flex-col items-center justify-between gap-16 py-[80px] relative">
        <h2 className="text-center text-[var(--main)]">
          Подарункові сертифікати
        </h2>

        <button className="btn-buy">
            Купити
        </button>
      </div>
    </section>
  )
}
