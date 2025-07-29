import { MasterCard, Visa } from '@/assets';
import { Card, CardContent, Checkbox, Input, RadioGroup, RadioGroupItem } from '@/components/ui';
import { IDeliveryInfo, IPaymentInfo, IPersonalInfo } from '@/types/';

interface DetailsProps {
  personalInfo: IPersonalInfo;
  deliveryInfo: IDeliveryInfo;
  paymentInfo: IPaymentInfo;
  onPersonalChange: (field: keyof IPersonalInfo, value: string | boolean) => void;
  onDeliveryChange: (field: keyof IDeliveryInfo, value: string) => void;
  onPaymentChange: (field: keyof IPaymentInfo | 'cardData', value: string | object) => void;
}

export const Details = ({
  personalInfo,
  deliveryInfo,
  // paymentInfo,
  onPersonalChange,
  onDeliveryChange,
  onPaymentChange,
}: DetailsProps) => {
  const personalFields = [
    { id: 'name', label: "Ім'я" },
    { id: 'surname', label: 'Прізвище' },
    { id: 'patronymic', label: 'По-батькові' },
    { id: 'phone', label: 'Номер телефону' },
    { id: 'email', label: 'Електронна пошта' },
  ];

  const deliveryMethods = [
    { id: 'courier', label: "Кур'єр Нова Пошта", price: 'Безкоштовно' },
    { id: 'postamat', label: 'Поштомат Нова Пошта', price: 'Безкоштовно' },
    { id: 'office', label: 'Відділення Нова Пошта', price: 'Безкоштовно' },
  ];

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
    <div className="flex flex-col gap-12 w-full max-w-[538px]">
      <Card className="bg-main shadow-main rounded-none font-main">
        <CardContent className="p-6 flex flex-col items-start gap-7">
          <h2 className="font-body text-brown-dark font-medium text-second">Ваші дані</h2>

          <div className="flex flex-col items-start gap-7 w-full">
            {personalFields.map((field) => (
              <div
                key={field.id}
                className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark"
              >
                <Input
                  className="h-10 w-full bg-transparent border-none rounded-none px-3 pt-2.5"
                  placeholder={field.label}
                  value={personalInfo[field.id as keyof IPersonalInfo] as string}
                  onChange={(e) =>
                    onPersonalChange(field.id as keyof IPersonalInfo, e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="gift" className="" />
            <label htmlFor="gift" className="text-brown-dark ">
              Оформити замовлення в подарунок
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark font-medium text-second">Доставка</h2>

            <div className="w-full relative flex items-center gap-2 border-b-2 border-grey bg-transparent rounded-none focus-within:border-brown-dark focus-within:text-brown-dark">
              <Input
                className="h-10 w-full bg-transparent border-0 "
                placeholder="Вкажіть місто"
                value={deliveryInfo.city}
                onChange={(e) => onDeliveryChange('city', e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col w-full items-start gap-7">
            <h2 className="font-body text-brown-dark font-medium text-second">Способи доставки</h2>

            <RadioGroup
              defaultValue="courier"
              className="w-full space-y-7"
              onValueChange={(value) => onDeliveryChange('method', value)}
            >
              {deliveryMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                    />
                    <label htmlFor={method.id} className=" text-brown-dark">
                      {method.label}
                    </label>
                  </div>
                  <span className=" text-grey">{method.price}</span>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-main shadow-main rounded-none">
        <CardContent className="p-6 flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-7 w-full">
            <h2 className="font-body text-brown-dark font-medium text-second">Оплата</h2>

            <RadioGroup
              defaultValue="card"
              className="w-full space-y-7"
              onValueChange={(value) => onPaymentChange('method', value)}
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="w-5 h-5 border-[0.5px] border-grey"
                      // checked={method.selected}
                    />
                    <label htmlFor={method.id} className=" text-brown-dark cursor-pointer">
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
                            className="w-5 h-5 border-[0.5px] border-grey"
                          />
                          <label htmlFor="savedCard" className=" text-brown-dark">
                            **** **** **** 4405
                          </label>
                        </div>
                        <div className="flex items-center justify-center px-7 py-2">
                          <span className="text-[12px] text-brown-dark">Mastercard</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="newCard"
                            id="newCard"
                            className="w-5 h-5 rounded-[10px] border-[0.5px] border-grey"
                          />
                          <label htmlFor="newCard" className=" text-brown-dark">
                            Додати картку
                          </label>
                        </div>

                        <div className="flex flex-col p-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="font-additional-small text-grey">Номер картки</label>
                            <Input className="h-6 w-[164px] border-[0.5px] border-grey rounded-none" />
                          </div>

                          <div className="flex w-[164px] items-center justify-between">
                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey">Термін дії</label>
                              <div className="relative w-[94px] h-6">
                                <Input className="h-6 w-full border-[0.5px] border-grey rounded-none" />
                                <div className="absolute top-0.5 left-11 font-additional-small text-grey">
                                  /
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="font-additional-small text-grey">CVV</label>
                              <Input className="h-6 w-10 border-[0.5px] border-grey rounded-none" />
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
