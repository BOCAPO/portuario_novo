import axios, { AxiosError, AxiosResponse } from 'axios';
import { instance } from '../../http';
import { IServiceUserRegisterData } from './types';

export const postRegisterUser = async (user: IServiceUserRegisterData) => {
  try {
    const userRegisterResponse: AxiosResponse = await instance.post('/user/registration/', user);

    return userRegisterResponse;
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }

    return error;
  }
}