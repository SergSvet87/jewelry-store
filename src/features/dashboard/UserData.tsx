import { userData } from '@/mock/userData';
import { Input, Label, RadioGroup, RadioGroupItem, Card, CardContent  } from '@/components/ui';


export const UserData = () => {
  return (
    <div className="flex gap-4 w-full h-auto justify-between">
      <Card className="flex-1 min-w-[350px]">
        <CardContent className="flex flex-col gap-7 p-2 h-full">
          <h4 className="mt-2">Основні дані</h4>

          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-wrap justify-between gap-4 w-full">
              <div className="flex flex-col gap-1 min-w-[100px] flex-1">
                <Label className="label mb-1">
                  Ім&apos;я
                </Label>
                <Input
                  className="h-10"
                  defaultValue={userData[0].firstName}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1 min-w-[180px] flex-1">
                <Label className="label mb-1">
                  Прізвище
                </Label>
                <Input
                  className="h-10"
                  defaultValue={userData[0].lastName}
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="label mb-1">
                Номер телефону
              </Label>
              <Input
                className="h-10"
                defaultValue={userData[0].phone}
                readOnly
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label className="label mb-1">
                Електронна пошта
              </Label>
              <Input
                className="h-10"
                defaultValue={userData[0].email}
                readOnly
              />
            </div>
          </div>

          <button className="btn-buy text-medium text-[20px] w-[212px]">Редагувати</button>
        </CardContent>
      </Card>

      <Card className="min-w-[300px] bg-main">
        <CardContent className="flex flex-col justify-between h-full p-2">
          <div className="flex flex-col gap-7">
            <h4 className="mt-2">Додаткові дані</h4>

            <div className="flex flex-col gap-7 pl-3">
              <div className="flex flex-col gap-1">
                <Label className="label mb-1">
                  Стать
                </Label>
                <RadioGroup
                  defaultValue={userData[0].gender}
                  className="flex justify-between h-10 items-center"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="female"
                      id="female"
                      className="w-5 h-5 border-[#5b242a] shadow-[1px_1px_4px_#00000040]"
                    />
                    <Label
                      htmlFor="female"
                      className=""
                    >
                      Жіноча
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="male"
                      id="male"
                      className="w-5 h-5 border-[#717171] shadow-[1px_1px_4px_#00000040]"
                    />
                    <Label
                      htmlFor="male"
                      className=""
                    >
                      Чоловіча
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="label mb-1">
                  День народження
                </Label>
                <div className="relative w-full h-10 bg-main border-b-2 border-[var(--grey)]">
                  <div className="absolute top-2.5 left-2 text-[var(--grey)] text-[16px] leading-[130%] font-normal">
                    &nbsp;&nbsp;ДД / ММ / РРРР
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="border-[var(--brown-dark)] border-1 text-medium text-[20px] px-10 h-[46px] self-start mt-auto">Зберегти</button>
        </CardContent>
      </Card>
    </div>
  );
};
