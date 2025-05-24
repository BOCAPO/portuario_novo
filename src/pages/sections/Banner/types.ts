export type TBannerSteps = 'color' | 'eco' | 'con' | 'conex' | 'next';

export type TBannerImages = {
  [key in TBannerSteps]: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type TBannerTexts = {
  [key in TBannerSteps]: {
    title: string;
    description: string;
  };
};
