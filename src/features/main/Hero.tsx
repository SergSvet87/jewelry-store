import { HeroImage1 } from "../../assets"

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[800px] bg-[100%_100%] text-[var(--main)] mb-40">

      <img className="absolute w-full h-full object-cover" src={HeroImage1} alt="Hero Image" />

      <div className="container flex flex-col items-center">

        <h1 className="absolute w-[353px] h-[157px] top-[233px] left-[150px] [font-family:'Merriweather',Helvetica] font-normal text-[54px] tracking-[0] leading-[normal] text-main">
          ВИТОНЧЕНІ ПРИКРАСИ
        </h1>

        <p className="absolute w-[365px] h-[53px] top-[410px] left-[150px] font-body font-normal text-main text-[20px] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
          Обирайте ідеальні ювелірні вироби для особливих моментів і кожного
          дня.
        </p>

        <button className="absolute top-[504px] left-[150px] px-[50px] py-2.5 bg-[color:var(--button)] backdrop-blur backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(8px)_brightness(100%)] rounded-none">
          <span className="font-button font-[number:var(--button-font-weight)] text-main text-[length:var(--button-font-size)] tracking-[var(--button-letter-spacing)] leading-[var(--button-line-height)] [font-style:var(--button-font-style)]">
            Купити
          </span>
        </button>

        <div className="absolute flex w-[300px] items-center justify-between top-[786px] left-[570px]">
          <div className="relative w-[86px] h-1 bg-[#e4e4e4]" />
          <div className="relative w-[86px] h-0.5 bg-grey" />
          <div className="relative w-[86px] h-0.5 bg-grey" />
        </div>
      </div>

    <div className="absolute w-full h-px top-[800px] left-0 bg-[#d9d9d9]" />
  </section>
  )
}
