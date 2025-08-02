import { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';

import { ICardData, IFormSchema } from '@/types/';
import { useSavedCards } from '@/lib/hooks/useSavedCards';
import { paymentMethods } from '@/constants/checkoutOptions';
import { Input, Label, RadioGroup, RadioGroupItem } from '@/components/ui';
import { SavedCardsList } from './SavedCardsList';

import { MasterCard, Visa } from '@/assets';

export const PaymentForm = () => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<IFormSchema>();
  const { savedCards, addCard } = useSavedCards();

  const cardType = watch('paymentInfo.cardType');

  useEffect(() => {
  if (cardType?.startsWith('savedCard')) {
    const idx = parseInt(cardType.split('-')[1]);
    const selected = savedCards[idx];
    if (selected) {
      setValue('paymentInfo.cardData', selected);
    }
  }
}, [cardType]);

  const onBlurSaveCard = () => {
    const card = getValues().paymentInfo.cardData;
    if (card && card.number && card.expiry && card.cvv) {
      addCard(card);
    }
  };

  const handleSelectSavedCard = (card: ICardData) => {
    setValue('paymentInfo.cardType', 'savedCard');
    setValue('paymentInfo.cardData', card);
  };

  return (
    <div className="flex flex-col items-start gap-7 w-full">
      <Controller
        name="paymentInfo.method"
        control={control}
        render={({ field }) => (
          <RadioGroup
            className="flex flex-col gap-2 pl-4 w-full space-y-7"
            value={field.onChange.toString()}
            onValueChange={(val) => setValue('paymentInfo.cardType', val as 'savedCard' | 'newCard')}
          >
            {paymentMethods.map((method) => (
              <fieldset key={method.id} className="flex flex-col w-full">
                <div key={method.id} className={cn('w-full')}>
                  <div className="w-full flex items-center space-x-2 ">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="w-5 h-5 border-[0.5px] border-grey"
                    />
                    <label htmlFor={method.id} className=" text-brown-dark cursor-pointer">
                      {method.label}
                    </label>
                  </div>

                  {method.id === 'card' && field.value === 'card' && (
                    <div className="w-full flex flex-col gap-4 mt-4 pl-10">
                      <RadioGroup
                        className="flex flex-col gap-2 pl-4 w-full space-y-7"
                        value={cardType}
                        onValueChange={(val) => field.onChange(val)}
                      >
                        <SavedCardsList cards={savedCards} onSelect={handleSelectSavedCard} />

                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="newCard" id="newCard" className="w-5 h-5 border-[0.5px] border-grey" />
                          <Label htmlFor="newCard">Додати картку</Label>
                        </div>
                      </RadioGroup>

                      <div className="flex flex-col p-2 gap-4">
                        <div>
                          <Label htmlFor="cardNumber" className="font-additional-small text-grey">
                            Номер картки
                          </Label>
                          <Input
                            id="cardNumber"
                            {...register('paymentInfo.cardData.number')}
                            onBlur={onBlurSaveCard}
                            className="h-6 w-[164px] border-[0.5px] border-grey rounded-none"
                          />
                          {errors.paymentInfo?.cardData?.number && (
                            <p className="text-sm text-red-500">
                              {errors.paymentInfo.cardData.number.message}
                            </p>
                          )}
                        </div>

                        <div className="flex w-[164px] items-center justify-between gap-[30px]">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="expiryDate">Термін дії</Label>
                            <div className="relative w-[94px] h-6">
                              <Input
                                id="expiryDate"
                                {...register('paymentInfo.cardData.expiry')}
                                onBlur={onBlurSaveCard}
                                className="h-6 w-full border-[0.5px] border-grey rounded-none"
                              />
                              <div className="absolute top-0.5 left-11 font-additional-small text-grey">
                                /
                              </div>
                            </div>
                            {errors.paymentInfo?.cardData?.expiry && (
                              <p className="text-sm text-red-500">
                                {errors.paymentInfo.cardData.expiry.message}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label htmlFor="cvc">CVV</Label>
                            <Input
                              id="cvv"
                              {...register('paymentInfo.cardData.cvv')}
                              className="h-6 w-10 border-[0.5px] border-grey rounded-none"
                            />
                            {errors.paymentInfo?.cardData?.cvv && (
                              <p className="text-sm text-red-500">
                                {errors.paymentInfo.cardData.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex w-[164px] items-center justify-between">
                          <button className="h-[30px] w-[92px] bg-grey text-main rounded-none">
                            Додати
                          </button>
                          <Visa />
                          <MasterCard />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </fieldset>
            ))}
          </RadioGroup>
        )}
      />
      {errors.paymentInfo?.method && (
        <p className="text-sm text-red-500">{errors.paymentInfo.method.message}</p>
      )}

      {/* {method === 'card' && (
        <div className="pl-10 mt-4 flex flex-col gap-4">
          <RadioGroup
            value={cardType}
            onValueChange={(val) =>
              setValue('paymentInfo.cardType', val as 'savedCard' | 'newCard')
            }
          >
            <SavedCardsList cards={savedCards} onSelect={handleSelectSavedCard} />

            <div className="flex items-center gap-2">
              <RadioGroupItem value="newCard" id="newCard" />
              <Label htmlFor="newCard">Додати картку</Label>
            </div>
          </RadioGroup>

          {cardType === 'newCard' && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="cardNumber">Номер картки</Label>
                <Input
                  id="cardNumber"
                  {...register('paymentInfo.cardData.number')}
                  onBlur={onBlurSaveCard}
                />
                {errors.paymentInfo?.cardData?.number && (
                  <p className="text-sm text-red-500">
                    {errors.paymentInfo.cardData.number.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="expiryDate">Термін дії</Label>
                <Input
                  id="expiryDate"
                  {...register('paymentInfo.cardData.expiry')}
                  onBlur={onBlurSaveCard}
                />
                {errors.paymentInfo?.cardData?.expiry && (
                  <p className="text-sm text-red-500">
                    {errors.paymentInfo.cardData.expiry.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" {...register('paymentInfo.cardData.cvv')} />
                {errors.paymentInfo?.cardData?.cvv && (
                  <p className="text-sm text-red-500">{errors.paymentInfo.cardData.cvv.message}</p>
                )}
              </div>

              <div className="flex w-[164px] items-center justify-between">
                <button className="h-[30px] w-[92px] bg-grey text-main rounded-none">Додати</button>

                <div className="">
                  <Visa />
                </div>

                <div className="">
                  <MasterCard />
                </div>
              </div>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};
