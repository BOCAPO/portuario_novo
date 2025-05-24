export type TStages = 'DEV' | 'PROD';

const stages = {
  DEV: {
    backend: 'https://quimea-hml.growtechnologies.com.br',
  },
  PROD: {
    backend: 'https://api.econext.com.br/',
  },
};

export const getEnvs = (env: TStages) => stages[env];
