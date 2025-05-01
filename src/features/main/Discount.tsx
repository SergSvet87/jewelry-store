import { DiscountImage } from '../../assets'
import { Card, CardContent } from '../../components/Card'

export const Discount = () => {
  return (
    <section className="relative w-full h-[700px] bg-cover bg-center flex items-center justify-center mb-40">
      <img className="absolute w-full h-full object-cover" src={DiscountImage} alt="Hero Image" />

      <Card className="bg-transparent border-0 shadow-none z-50 text-[var(--main)] w-[650px]">

        <CardContent className="flex flex-col items-center justify-center gap-10 p-0">
          <h2 className="font-heading-3 text-main text-center text-[54px] leading-normal">
            Знижка на перше замовлення
            <br />5 %
          </h2>

          <button className="mt-10 px-[50px] py-2.5 bg-[color:var(--button)] backdrop-blur font-button text-main text-[20px] leading-normal">
            Купити
          </button>
        </CardContent>
      </Card>
    </section>
  )
}
