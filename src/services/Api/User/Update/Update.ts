import { instance } from '~services/Api/http';

import { IUserDataToPatch } from './types';

export const updateUserInfo = async (userData: IUserDataToPatch) => {
  const { image, ...userInfo } = userData;

  const formData = new FormData();

  if (image instanceof File) {
    formData.append('image', image, image.name);

    await instance.put('/user/user/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  const response = await instance.patch('/user/user', userInfo);

  return response;
};
