import { Reducer, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthAction, LocalStorage } from '@/enums';
import { LoginRequest, RegisterRequest, VerifyRequest } from '@/types/auth';
import { login, registerUser, verifyPhoneLogin, verifyPhoneNumber } from '@/services/authService';
import { useModalStore } from '@/store/useModalStore';
import { localStorageService } from '@/api/localStorageService';

type Return = {
  loginFormValue: LoginRequest;
  registerFormValue: RegisterRequest;
  verifyCodeValue: VerifyRequest;
  onLoginFormSubmit: (loginFormValue: LoginRequest) => void;
  onLoginFormChange: (loginFormValue: LoginRequest) => void;
  onRegisterFormChange: (value: RegisterRequest) => void;
  onRegisterFormSubmit: (registerFormValue: RegisterRequest) => void;
  onVerifyPhoneCode: (code: VerifyRequest) => void;
  onVerifyPhoneLogin: (code: VerifyRequest) => void;
  onVerifyPhoneCodeChange: (code: VerifyRequest) => void;
};

type State = {
  loginFormValue: LoginRequest;
  registerFormValue: RegisterRequest;
  verifyCodeValue: VerifyRequest;
};

type ReducerAction =
  | {
    type: AuthAction.LOGIN_FORM;
    payload: LoginRequest;
  }
  | {
    type: AuthAction.REGISTER_FORM;
    payload: RegisterRequest;
  }
  | {
    type: AuthAction.VERIFY_CODE;
    payload: VerifyRequest;
  }
  | {
    type: AuthAction.RESET_FORM;
  };

const LOGIN_FORM_INITIAL_VALUE: LoginRequest = {
  email: '',
};

const VERIFY_CODE_INITIAL_VALUE: VerifyRequest = {
  code: '',
};

const REGISTER_FORM_INITIAL_VALUE: RegisterRequest = {
  name: '',
  email: '',
};

const INITIAL_STATE: State = {
  loginFormValue: LOGIN_FORM_INITIAL_VALUE,
  registerFormValue: REGISTER_FORM_INITIAL_VALUE,
  verifyCodeValue: VERIFY_CODE_INITIAL_VALUE,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {

  switch (action.type) {
    case AuthAction.LOGIN_FORM:
      return {
        ...state,
        loginFormValue: action.payload,
      };

    case AuthAction.VERIFY_CODE:
      return {
        ...state,
        verifyCodeValue: action.payload,
      };

    case AuthAction.REGISTER_FORM:
      return {
        ...state,
        registerFormValue: action.payload,
      };

    case AuthAction.RESET_FORM:
      return {
        ...state,
        loginFormValue: LOGIN_FORM_INITIAL_VALUE,
        registerFormValue: REGISTER_FORM_INITIAL_VALUE,
        verifyCodeValue: VERIFY_CODE_INITIAL_VALUE,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useAuth = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const navigate = useNavigate();

  const onLoginFormChange = (newValue: LoginRequest) => {
    dispatch({ type: AuthAction.LOGIN_FORM, payload: newValue });
  };

  const onVerifyPhoneCodeChange = (code: VerifyRequest) => {
    dispatch({ type: AuthAction.VERIFY_CODE, payload: code })
  };
  
  const onRegisterFormChange = (newValue: RegisterRequest) => {
    dispatch({ type: AuthAction.REGISTER_FORM, payload: newValue });
  };
  
  const onVerifyPhoneCode = async (code: VerifyRequest) => {
    const res = await verifyPhoneNumber(code);

    if (res) {
      useModalStore.getState().close();
      navigate(AppRoute.SUCCESS);

      localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, res.token);
      // localStorageService.setItem(LocalStorage.REFRESH_TOKEN_KEY, res.refresh_token);
    }

    dispatch({ type: AuthAction.RESET_FORM })
  };

  const onVerifyPhoneLogin = async (code: VerifyRequest) => {
    const res = await verifyPhoneLogin(code);

    if (res) {
      useModalStore.getState().close();
      navigate(AppRoute.ROOT);

      localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, res.token);
      // localStorageService.setItem(LocalStorage.REFRESH_TOKEN_KEY, res.refresh_token);
    }

    dispatch({ type: AuthAction.RESET_FORM })
  };

  const onLoginFormSubmit = async (loginFormValue: LoginRequest) => {

    const res = await login(loginFormValue);
    if (res) {
      useModalStore.getState().open('phoneVerification');

      localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, res.token);
      // localStorageService.setItem(LocalStorage.REFRESH_TOKEN_KEY, res.refresh_token);
    }

    dispatch({ type: AuthAction.RESET_FORM });
  };

  const onRegisterFormSubmit = async (registerFormValue: RegisterRequest) => {
    const res = await registerUser(registerFormValue);

    if (res) {
      useModalStore.getState().open('phoneVerification');

      localStorageService.setItem(LocalStorage.ACCESS_TOKEN_KEY, res.token);
    }

    dispatch({ type: AuthAction.RESET_FORM });
  };

  return {
    loginFormValue: state.loginFormValue,
    registerFormValue: state.registerFormValue,
    verifyCodeValue: state.verifyCodeValue,
    onLoginFormSubmit,
    onLoginFormChange,
    onRegisterFormSubmit,
    onRegisterFormChange,
    onVerifyPhoneCode,
    onVerifyPhoneLogin,
    onVerifyPhoneCodeChange,
  };
};

export { useAuth };
