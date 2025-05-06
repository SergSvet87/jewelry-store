import { Link } from 'react-router-dom'

import { AppRoute } from '../../enums'
import { DiscountImage } from '../../assets'
import { Card, CardContent } from '../../components/Card'

export const Discount = () => {
  return (
    <section className="relative w-full h-[700px] bg-cover bg-center flex items-center justify-center mb-[var(--section-indent)]">
      <img className="absolute w-full h-full object-cover" src={DiscountImage} alt="Hero Image" />

      <Card className="bg-transparent border-0 shadow-none z-50 text-[var(--main)] w-[550px]">

        <CardContent className="flex flex-col items-center justify-center gap-10 p-0">
          <h2 className="text-center">
            Знижка на перше замовлення
            <br />5 %
          </h2>

          <Link to={AppRoute.PRODUCTS}>
            <button className="btn-buy">
              Купити
            </button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
