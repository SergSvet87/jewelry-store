import { Card, CardContent } from '@/components/ui';

export const PopUpConfirmationPhone = () => {
  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-[448px] bg-main relative">
        <CardContent className="p-8 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-7 w-full">
            <h2 className="text-[length:var(--text)]  font-[500] font-[family-name:var(--font-main)]">
              Підтвердження номеру телефону
            </h2>

            <p className="text-center text-[var(--grey)]">
              Введіть код, який було відправлено вам на номер <span>+ 38 (066) 695 44 44</span>
            </p>

            <button className="w-full h-[45px] btn-buy">
              <span className="font-[500] text-[length:var(--text)]">
              Підтвердити
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    // </div>
  );
};
