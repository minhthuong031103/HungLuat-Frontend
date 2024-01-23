import { useDispatch } from 'react-redux';
import { useKey } from './useKey';
import {
  dispatchActions,
  useUserDispatch,
  useUserState,
} from '@/context/UserProvider';
import { LoginProps } from '@/lib/interface';
import toast from 'react-hot-toast';
import { EUserType } from '@/lib/constant';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const { setKeySite, setUserLogin, removeKeySite } = useKey();
  const userDispatch = useUserDispatch();
  const { isAuth } = useUserState();

  const onLogin = async (data: LoginProps) => {
    // try {
    //   const res = await sendPromiseMessage(data);
    //   console.log('🚀 ~ onLogin ~ res:', res);
    //   if (
    //     res?.data?.accessToken &&
    //     res?.data?.refreshToken &&
    //     res?.data?.user
    //   ) {
    //     setKeySite({
    //       token: res?.data?.accessToken,
    //       refreshToken: res?.data?.refreshToken,
    //     });
    //     setUserLogin({ user: JSON.stringify(res?.data?.user) });
    //     dispatchActions({ type: EUserType.LOGIN, payload: null }, userDispatch);
    //   }
    // } catch (e) {
    //   if (e?.code == 1) toast.error('Email or password is wrong');
    // }
  };

  const onLogout = async () => {
    // const res = await sendPromiseMessage({ type: 'logout' });

    removeKeySite();
    dispatchActions({ type: EUserType.LOGOUT, payload: {} }, userDispatch);
  };

  const useCheckNotLoggedIn = () => {
    useEffect(() => {
      if (!isAuth) {
        router.push('/auth/login');

        //delay 1s
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }, [isAuth]);
  };

  const useCheckLoggedIn = () => {
    useEffect(() => {
      if (isAuth) {
        router.push('/');

        //delay 1s
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    }, [isAuth]);
  };

  return {
    onLogin,
    isAuth,
    onLogout,
    useCheckLoggedIn,
    useCheckNotLoggedIn,
    loading,
  };
};
