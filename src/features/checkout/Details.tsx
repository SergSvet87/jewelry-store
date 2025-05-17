import { Card, CardContent, Checkbox, Input, RadioGroup, RadioGroupItem } from '@/components/ui';

export const Details = () => {
  // Personal information fields
  const personalFields = [
    { id: 'name', label: "Ім'я" },
    { id: 'surname', label: 'Прізвище' },
    { id: 'patronymic', label: 'По-батькові' },
    { id: 'phone', label: 'Номер телефону' },
    { id: 'email', label: 'E-mail' },
  ];

  // Delivery methods
  const deliveryMethods = [
    { id: 'courier', label: "Кур'єр Нова Пошта", price: 'Безкоштовно' },
    { id: 'postamat', label: 'Поштомат Нова Пошта', price: 'Безкоштовно' },
    { id: 'office', label: 'Відділення Нова Пошта', price: 'Безкоштовно' },
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'onDelivery', label: 'Оплата при отриманні' },
    {
      id: 'card',
      label: 'Оплата платіжною картою VISA/Mastercard',
      selected: true,
    },
    { id: 'privatbank', label: 'Оплата частинами ПриватБанк' },
    { id: 'monobank', label: 'Оплата частинами Monobank' },
    { id: 'gift', label: 'Подарунковий сертифікат' },
  ];

  return (
    <div className="flex flex-col gap-12 w-full max-w-[426px]">
      {/* Personal Information Card */}
      <Card className="bg-main shadow-[1px_1px_4px_#00000040] rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-7">
          <h2 className="font-body text-brown-dark text-[var(--body-font-size)] leading-[var(--body-line-height)]">
            Ваші дані
          </h2>

          <div className="flex flex-col items-start gap-7 w-full">
            {personalFields.map((field) => (
              <div key={field.id} className="w-full relative">
                <Input
                  className="h-10 bg-main border-0 border-b-2 border-[#717171] rounded-none px-3 pt-2.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="gift"
              className="w-6 h-6 rounded-none data-[state=checked]:bg-button border-[#717171]"
            />
            <label
              htmlFor="gift"
              className="font-body-small text-brown-dark text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]"
            >
              Оформити замовлення в подарунок
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Card */}
      <Card className="bg-main shadow-[1px_1px_4px_#00000040] rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark text-[var(--body-font-size)] leading-[var(--body-line-height)]">
              Доставка
            </h2>

            <div className="w-full relative">
              <Input
                className="h-10 bg-main border-0 border-b-2 border-[#717171] rounded-none px-3 pt-2.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Вкажіть місто"
              />
            </div>
          </div>

          <div className="flex flex-col w-full items-start gap-7">
            <h2 className="font-body text-brown-dark text-[var(--body-font-size)] leading-[var(--body-line-height)]">
              Способи доставки
            </h2>

            <RadioGroup defaultValue="courier" className="w-full space-y-7">
              {deliveryMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="w-5 h-5 rounded-[10px] border-[0.5px] border-[#717171] shadow-[1px_1px_4px_#00000040] data-[state=checked]:bg-button data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor={method.id}
                      className="font-body-small text-brown-dark text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]"
                    >
                      {method.label}
                    </label>
                  </div>
                  <span className="font-body-small text-grey text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]">
                    {method.price}
                  </span>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Payment Card */}
      <Card className="bg-main shadow-[1px_1px_4px_#00000040] rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark text-[var(--body-font-size)] leading-[var(--body-line-height)]">
              Оплата
            </h2>

            <RadioGroup defaultValue="card" className="w-full space-y-7">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="w-5 h-5 rounded-[10px] border-[0.5px] border-[#717171] shadow-[1px_1px_4px_#00000040] data-[state=checked]:bg-button data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor={method.id}
                      className="font-body-small text-brown-dark text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]"
                    >
                      {method.label}
                    </label>
                  </div>

                  {method.id === 'card' && method.selected && (
                    <div className="flex flex-col pl-10 mt-7 gap-6">
                      <div className="flex flex-col gap-1 w-40">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="savedCard"
                            id="savedCard"
                            className="w-5 h-5 rounded-[10px] border-[0.5px] border-[#717171] shadow-[1px_1px_4px_#00000040]"
                          />
                          <label
                            htmlFor="savedCard"
                            className="font-body-small text-brown-dark text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]"
                          >
                            **** **** **** 4405
                          </label>
                        </div>
                        <div className="flex items-center justify-center px-7 py-2">
                          <span className="font-additional-small text-brown-dark text-[var(--additional-small-font-size)] leading-[var(--additional-small-line-height)]">
                            Mastercard
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="newCard"
                            id="newCard"
                            className="w-5 h-5 rounded-[10px] border-[0.5px] border-[#717171] shadow-[1px_1px_4px_#00000040]"
                          />
                          <label
                            htmlFor="newCard"
                            className="font-body-small text-brown-dark text-[var(--body-small-font-size)] leading-[var(--body-small-line-height)]"
                          >
                            Додати картку
                          </label>
                        </div>

                        <div className="flex flex-col p-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="font-additional-small text-grey text-[var(--additional-small-font-size)] leading-[var(--additional-small-line-height)]">
                              Номер картки
                            </label>
                            <Input className="h-6 w-[164px] border-[0.5px] border-[#717171] rounded-none" />
                          </div>

                          <div className="flex w-[164px] items-center justify-between">
                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey text-[var(--additional-small-font-size)] leading-[var(--additional-small-line-height)]">
                                Термін дії
                              </label>
                              <div className="relative w-[94px] h-6">
                                <Input className="h-6 border-[0.5px] border-[#717171] rounded-none" />
                                <div className="absolute top-1.5 left-11 font-additional-small text-grey text-[var(--additional-small-font-size)] leading-[var(--additional-small-line-height)]">
                                  /
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey text-[var(--additional-small-font-size)] leading-[var(--additional-small-line-height)]">
                                CVV
                              </label>
                              <Input className="h-6 w-10 border-[0.5px] border-[#717171] rounded-none" />
                            </div>
                          </div>

                          <div className="flex w-[164px] items-center justify-between">
                            <button className="h-[30px] w-[92px] bg-grey text-main rounded-none">
                              Додати
                            </button>

                            <div className="flex w-5 h-4 items-center justify-center bg-white rounded-sm border-[0.7px] border-[#c5cdcf]">
                              <img className="h-3" alt="Visa" src="/mage-visa.svg" />
                            </div>

                            <div className="relative w-5 h-4 bg-white rounded-sm border-[0.7px] border-[#c5cdcf]">
                              <img
                                className="absolute w-3.5 h-[9px] top-1 left-[3px]"
                                alt="Mastercard"
                                src="/logos-mastercard.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
