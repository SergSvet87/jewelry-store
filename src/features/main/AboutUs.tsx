import { About } from "../../assets"

export const AboutUs = () => {
  return (
    <section id="about-us" className="relative w-full h-[800px] flex flex-col items-center justify-center  mb-[var(--section-indent)] bg-cover bg-center"
    style={{ backgroundImage: `url(${About})` }}>
     
      <h2 className="text-center text-[var(--brown-dark)] mb-[41px]">
        Про нас
      </h2>

      <div className="flex flex-col z-50 items-center gap-6 max-w-[490px] text-center text-[length:var(--text)]">
          <p>
            У нашому ювелірному магазині кожна прикраса — це поєднання бездоганної якості та унікального стилю. Ми віримо, що коштовності мають не лише прикрашати, а й підкреслювати індивідуальність.
          </p>

          <p>
            Ми ретельно відбираємо найкращі дорогоцінні метали та натуральні камені, щоб створювати прикраси, що передають витонченість, довговічність і гармонію. Наші майстри ювелірного мистецтва працюють із любов’ю до деталей, втілюючи у виробах унікальні рішення.
          </p>
      </div>
    </section>
  )
}
