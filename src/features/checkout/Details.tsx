import { Card, CardContent } from '@/components/ui';
import { ContactsForm } from './ContactsForm';
import { DeliveryForm } from './DeliveryForm';
import { GiftCheckbox } from './GiftCheckbox';
import { PaymentForm } from './PaymentForm';

export const Details = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-[538px]">
      <Card className="bg-main shadow-main rounded-none font-main">
        <CardContent className="p-6 flex flex-col items-start gap-7">
          <h2 className="font-body text-brown-dark font-medium text-second">Ваші дані</h2>

          <ContactsForm />

          <GiftCheckbox />
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark font-medium text-second">Доставка</h2>

            <DeliveryForm />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>
          
          <PaymentForm />
        </CardContent>
      </Card>

      {/* <Card className="bg-main shadow-main rounded-none font-main">
        

          <fieldset className="flex flex-col gap-4">
            <h2 className="font-body text-brown-dark font-medium text-second mb-5">
              Способи доставки
            </h2>

            <Controller
              name="deliveryInfo.method"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="w-full space-y-7"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {deliveryMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                      />
                      <label htmlFor={method.id} className=" text-brown-dark">
                        {method.label} — {method.price}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.paymentInfo?.method && (
              <p className="text-sm text-red-500 mt-1">{errors.paymentInfo.method.message}</p>
            )}
          </fieldset>
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <fieldset className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>

            <Controller
              name="paymentInfo.cardType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                  className="w-full space-y-7"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="w-5 h-5 border-[0.5px] border-grey"
                      />
                      <label htmlFor={method.id} className=" text-brown-dark cursor-pointer">
                        {method.label}
                      </label>
                    </div>
                  ))}

                  <div className="flex flex-col pl-10 mt-7 gap-6">
                    <div className="flex flex-col gap-1 w-40">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value="savedCard"
                          id="savedCard"
                          className="w-5 h-5 border-[0.5px] border-grey"
                          checked={field.value === 'savedCard'}
                        />
                        <label htmlFor="savedCard" className=" text-brown-dark">
                          **** **** **** 4405
                        </label>
                      </div>
                      <div className="flex items-center justify-center px-7 py-2">
                        <span className="text-[12px] text-brown-dark">Mastercard</span>
                      </div>
                    </div>

                    {field.value === 'newCard' && (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="newCard"
                            id="newCard"
                            className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                            checked={field.value === 'newCard'}
                          />
                          <label htmlFor="newCard" className=" text-brown-dark">
                            Додати картку
                          </label>
                        </div>

                        <div className="flex flex-col p-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="font-additional-small text-grey">Номер картки</label>
                            <Input
                              className="h-6 w-[164px] border-[0.5px] border-grey rounded-none"
                              {...register('paymentInfo.cardData.number')}
                            />
                          </div>

                          <div className="flex w-[164px] items-center justify-between">
                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey">Термін дії</label>
                              <div className="relative w-[94px] h-6">
                                <Input
                                  className="h-6 w-full border-[0.5px] border-grey rounded-none"
                                  {...register('paymentInfo.cardData.expiry')}
                                />
                                <div className="absolute top-0.5 left-11 font-additional-small text-grey">
                                  /
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey">CVV</label>
                              <Input
                                className="h-6 w-10 border-[0.5px] border-grey rounded-none"
                                {...register('paymentInfo.cardData.cvv')}
                              />
                            </div>
                          </div>

                          <div className="flex w-[164px] items-center justify-between">
                            <button className="h-[30px] w-[92px] bg-grey text-main rounded-none">
                              Додати
                            </button>

                            <div className="">
                              <Visa />
                            </div>

                            <div className="">
                              <MasterCard />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>
              )}
            />
          </fieldset>
        </CardContent>
      </Card> */}
    </div>
  );
};
