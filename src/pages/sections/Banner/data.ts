import EconextCon from './images/econext-con.svg';
import EconextConex from './images/econext-conex.svg';
import EconextEco from './images/econext-eco.svg';
import EconextFullColor from './images/econext-fully-colored.svg';
import EconextNext from './images/econext-next.svg';
import { TBannerImages, TBannerSteps, TBannerTexts } from './types';

export const steps: TBannerSteps[] = ['eco', 'con', 'conex', 'next'];

export const banners: TBannerImages = {
  color: EconextFullColor,
  eco: EconextEco,
  con: EconextCon,
  conex: EconextConex,
  next: EconextNext,
};

export const texts: TBannerTexts = {
  eco: {
    title: 'ECOEFICIÊNCIA',
    description: 'Redução dos impactos ambientais por meio de bens e serviços',
  },
  con: {
    title: 'CONHECIMENTO',
    description: 'Especialize-se nos nossos cursos',
  },
  conex: {
    title: 'CONEXÃO',
    description:
      'Diálogo entre pessoas e organizações para construir soluções sustentáveis',
  },
  next: {
    title: 'TENDÊNCIAS',
    description:
      'Como acompanhar as inovações e mudanças que se referem ao meio ambiente',
  },
  color: {
    title: '',
    description: '',
  },
};
