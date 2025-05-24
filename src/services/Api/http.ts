import { getEnvs, TStages } from '~config/env';
import axios from 'axios';

// import { apiUrl } from './apiConstants';

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const endpoints = getEnvs(process.env.STAGE as TStages);

// export const instance = axios.create({ baseURL: apiUrl });
export const instance = axios.create({
  baseURL: endpoints.backend,
  validateStatus: (status) => status < 500,
});
