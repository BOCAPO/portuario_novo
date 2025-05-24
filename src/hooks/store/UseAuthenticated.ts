/* eslint-disable camelcase */
import { GetServerSidePropsContext, PreviewData } from 'next';
import Router from 'next/router';

import { instance } from '~services/Api/http';
import { AxiosResponse } from 'axios';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

import { setUser } from './UseLoginStore';

interface IGetUserResponse extends AxiosResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    image: string | null;
    description: string | null;
    cpf: string | null;
  };
}

const ACCESS_TOKEN = 'econext-accessToken';

export const UseAuthenticated = async (
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  token?: string
): Promise<IGetUserResponse | unknown> => {
  try {
    const { 'econext-accessToken': hasToken } = parseCookies(context);

    if (hasToken) {
      instance.defaults.headers.Authorization = `Token ${hasToken}`;

      const { data: userResponse }: IGetUserResponse = await instance.get('/user/user/');

      setUser(userResponse);

      return userResponse;
    }

    if (token) {
      instance.defaults.headers.Authorization = `Token ${token}`;

      const { data: userResponse }: IGetUserResponse = await instance.get('/user/user/');

      setCookie(undefined, ACCESS_TOKEN, token, {
        maxAge: 604800 * 1, // semana * qtdSemanas
      });

      setUser(userResponse);

      return userResponse;
    }

    return false;
  } catch (error) {
    destroyCookie(undefined, 'econext-accessToken');
    setUser(null);
    return error;
  }
};

export const UseExit = async () => {
  destroyCookie(undefined, 'econext-accessToken');
  setUser(null);
  Router.push('/');
};
