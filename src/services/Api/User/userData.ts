import { IUserData } from 'src/pages/sections/LoginDrawer/types';
import { instance } from '../http';
import { IServiceUserLoginData, IServiceUserRegisterData} from './types';

export const postLoginUser = async (user: IServiceUserLoginData) => {
  return instance.post<any>('/user/login/', user);
}

export const postRegisterUser = async (user: IServiceUserRegisterData) => {
  return instance.post<any>('/user/registration/', user);
}


export const getUserData = async () => {
  const res = await instance.get('/user/user/');
  return res.data as IUserData;
};
