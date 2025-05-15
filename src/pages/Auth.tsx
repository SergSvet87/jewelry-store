import { PopUpConfirmationPhone } from "@/features/auth/ConfirmationPhone";
import { LoginForm } from "@/features/auth/LoginForm";
import { RegisterForm } from "@/features/auth/RegisterForm";

export const Auth = () => {
  return <div className="container mx-auto py-10 flex justify-center items-center flex-col">
    <h1>Auth</h1>

    <LoginForm />

    <RegisterForm />

    <PopUpConfirmationPhone />
  </div>;
};
