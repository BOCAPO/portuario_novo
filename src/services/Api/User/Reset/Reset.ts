import { instance } from '../../http';

interface IServiceResetPasswordData {
  email: string;
}

export const postResetPassword = async (email: IServiceResetPasswordData) => {
  return instance.post<any>('/user/password/reset/', email);
};
