import { About } from "../../assets"

export const AboutUs = () => {
  return (
    <section className="relative w-full h-[800px] flex flex-col items-center justify-center bg-cover bg-center mb-40">
     <img className="absolute w-full h-full object-cover" src={About} alt="About Image" />
     
      <h2 className="font-heading-3 text-[54px] z-50 text-brown-dark tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)] mb-10">
        Про нас
      </h2>

      <div className="flex flex-col z-50 items-center gap-6 max-w-[500px]">
          <p
            className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]"
          >
            У нашому ювелірному магазині кожна прикраса — це поєднання бездоганної якості та унікального стилю. Ми віримо, що коштовності мають не лише прикрашати, а й підкреслювати індивідуальність.
          </p>

          <p
            className="font-body font-[number:var(--body-font-weight)] text-brown-dark text-[length:var(--body-font-size)] text-center tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]"
          >
            Ми ретельно відбираємо найкращі дорогоцінні метали та натуральні камені, щоб створювати прикраси, що передають витонченість, довговічність і гармонію. Наші майстри ювелірного мистецтва працюють із любов’ю до деталей, втілюючи у виробах унікальні рішення.
          </p>
      </div>
    </section>
  )
}
