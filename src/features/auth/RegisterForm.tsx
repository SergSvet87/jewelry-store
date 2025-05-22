import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'classnames';

import { ApiEndpoint, AppRoute } from '@/enums';
import { RegisterRequest } from '@/types/';
import { registerSchema } from '@/schemas/authSchema';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { AppleIcon, GoogleIcon, PhoneIcon, UserIcon } from '@/assets';

interface RegisterFormProps {
  initialValues: RegisterRequest;
  onRegister: (data: RegisterRequest) => void;
  onChangeField: (value: RegisterRequest) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  initialValues,
  onRegister,
  onChangeField,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: initialValues,
  });

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
          <h2 className="text-[length:var(--text)] font-[500] font-[family-name:var(--font-main)]">
            Реєстрація
          </h2>

          <form
            className="flex flex-col items-center gap-7 w-full"
            onSubmit={handleSubmit(onRegister)}
          >
            <div className="w-full">
              <div
                className={cn(
                  'flex items-center gap-2 border-0 border-b-2 bg-transparent rounded-none focus-within:border-[var(--brown-dark)] focus-within:text-[var(--brown-dark)]',
                  errors.phone
                    ? 'border-[var(--error)] text-[var(--error)]'
                    : 'border-[var(--grey)] text-[var(--grey)]',
                )}
              >
                <PhoneIcon
                  classname={cn(
                    'w-5 h-5 text-inherit',
                    errors.phone
                      ? 'border-[var(--error)] text-[var(--error)]'
                      : 'border-[var(--grey)] text-[var(--grey)]',
                  )}
                />
                <Input
                  {...register('phone')}
                  name="phone"
                  placeholder="Ваш номер телефону"
                  className="w-full h-10 pr-5 !bg-transparent border-none"
                  type="tel"
                  onChange={(e) => {
                    setValue('phone', e.target.value);
                    onChangeField({ ...initialValues, phone: e.target.value });
                  }}
                />
              </div>
              {errors.phone && (
                <p className="text-[var(--error)] text-xs text-center mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="w-full">
              <div
                className={cn(
                  'flex items-center gap-2 border-0 border-b-2 bg-transparent rounded-none focus-within:border-[var(--brown-dark)] focus-within:text-[var(--brown-dark)]',
                  errors.phone
                    ? 'border-[var(--error)] text-[var(--error)]'
                    : 'border-[var(--grey)] text-[var(--grey)]',
                )}
              >
                <UserIcon
                  classname={cn(
                    'w-5 h-5 text-inherit',
                    errors.phone
                      ? 'border-[var(--error)] text-[var(--error)]'
                      : 'border-[var(--grey)] text-[var(--grey)]',
                  )}
                />
                <Input
                  {...register('name')}
                  name="name"
                  className="w-full h-10 pr-5 !bg-transparent border-none"
                  type="text"
                  placeholder="Ваше ім'я"
                  onChange={(e) => {
                    setValue('name', e.target.value);
                    onChangeField({ ...initialValues, name: e.target.value });
                  }}
                />
              </div>
              {errors.name && (
                <p className="text-[var(--error)] text-xs text-center mt-1">{errors.name.message}</p>
              )}
            </div>

            <Button className="w-full">Зареєструватися</Button>
          </form>

          <div className="flex flex-col items-center gap-5 w-full">
            <p className="text-[var(--grey)]">або продовжити з</p>

            <form className="flex w-full items-center justify-between">
              <Button variant="secondary" className="" asChild>
                <Link to={ApiEndpoint.GOOGLE} className="text-[var(--black)]">
                  <GoogleIcon />
                  Google
                </Link>
              </Button>

              <Button variant="secondary" className="bg-[var(--black)] text-[var(--white)]" asChild>
                <Link to={ApiEndpoint.APPLE} className="text-[var(--black)]">
                  <AppleIcon />
                  Apple
                </Link>
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col w-full items-center gap-5">
          <p className="text-[var(--grey)]">Вже є акаунта?</p>

          <Button asChild variant="outline" className="w-full">
            <Link to={AppRoute.SIGN_IN}>Увійти</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
