/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SmartphoneIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui';
import { registerSchema } from '@/schemas/authSchema';
import { useRegister } from './hooks/useRegister';

export const RegisterForm = () => {
  const { handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerUser } = useRegister();

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data);
      console.log('User registered:', res);
    } catch (e) {
      console.error('Registration error:', e);
    }
  };
  return (
    <Card className="w-[448px] bg-main relative">
      {/* <button
          // variant="ghost"
          // size="icon"
          className="absolute right-5 top-5 h-5 w-5 p-0"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5" />
        </button> */}

      <CardContent className="p-8 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-7 w-full">
          <h2 className="text-[length:var(--text)]  font-[500] font-[family-name:var(--font-main)]">
            Реєстрація
          </h2>

          <form className="flex flex-col items-center gap-7 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative w-full">
              <div className="absolute left-3 top-2.5 flex items-center gap-2">
                <SmartphoneIcon className="w-5 h-5 text-grey" />
                <span className="text-[var(--grey)]">
                  Ваш номер телефону
                </span>
              </div>
              <Input
                className="h-10 bg-main border-0 border-b-2 border-[#717171] rounded-none pl-[60px] focus-visible:ring-0 focus-visible:border-brown-dark"
                type="tel"
              />
            </div>

            <div className="relative w-full">
              <div className="absolute left-3 top-2.5 flex items-center gap-2">
                <SmartphoneIcon className="w-5 h-5 text-grey" />
                <span className="text-[var(--grey)]">
                  Ваше ім'я
                </span>
              </div>
              <Input
                className="h-10 bg-main border-0 border-b-2 border-[#717171] rounded-none pl-[60px] focus-visible:ring-0 focus-visible:border-brown-dark"
                type="text"
              />
            </div>

            <button className="w-full h-[45px] btn-buy">
              <span className="font-[500] text-[length:var(--text)]">
                Зареєструватися
              </span>
            </button>
          </form>

          <div className="flex flex-col items-center gap-5 w-full">
            <p className="text-[var(--grey)]">
              або продовжити з
            </p>

            <div className="flex w-full items-center justify-between">
              <button
                // variant="outline"
                className="w-[172px] h-11 bg-white border-none hover:bg-gray-100"
              >
                <div className="w-6 h-6 mr-2">
                  <img
                    className="w-[23px] h-[23px]"
                    alt="Google logo"
                    src="/logo-googleg-48dp.png"
                  />
                </div>
                <span className="font-body-small font-[number:var(--body-small-font-weight)] text-text-secondary text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
                  Google
                </span>
              </button>

              <button
                // variant="outline"
                className="w-[172px] h-11 bg-black-black text-text-white border-none hover:bg-gray-900"
              >
                <img className="w-6 h-6 mr-2" alt="Apple logo" src="/apple-logo.svg" />
                <span className="font-body-small font-[number:var(--body-small-font-weight)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)]">
                  Apple
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-5">
          <p className="text-[var(--grey)]">
            Вже є акаунта?
          </p>

          <button
            // variant="outline"
            className="w-full h-[45px] border-[#1d110a] hover:bg-gray-100"
          >
            <span className="font-[500] text-[length:var(--text)]">
              Увійти
            </span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
