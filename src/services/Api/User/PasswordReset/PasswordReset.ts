import axios, { AxiosError, AxiosResponse } from 'axios';
import { instance } from '../../http';
import { IServiceUserPasswordResetData } from './types';

export const postPasswordResetUser = async (payload: IServiceUserPasswordResetData) => {
  try {
    const userPasswordResetResponse: AxiosResponse = await instance.post('/user/password/reset/confirm/', payload);

    return userPasswordResetResponse;
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }

    return error;
  }
};
