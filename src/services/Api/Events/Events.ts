import { AxiosResponse } from 'axios';

import { instance } from '../http';
import { IEventFormDataRequest } from './types';

export const getEventCategories = async () => {
  const res = await instance.get('/events_categories/');

  return res.data;
};

export const getAllEventos = async () => {
  const { data: events } = await instance.get(`/events/`);

  return events;
};

export const createEvent = async (eventData: IEventFormDataRequest) => {
  const formData = new FormData();

  const { category, description, end_date, local, start_date, title, image_dir, webpage_url } =
    eventData;

  formData.append('category', String(category));
  formData.append('description', description);
  formData.append('end_date', end_date);
  formData.append('local', local);
  formData.append('start_date', start_date);
  formData.append('title', title);
  if (webpage_url) formData.append('webpage_url', webpage_url);

  if (image_dir) {
    formData.append('image_dir', image_dir);
  }

  const createNewEventResponse: AxiosResponse = await instance.post('/events/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return createNewEventResponse;
};
