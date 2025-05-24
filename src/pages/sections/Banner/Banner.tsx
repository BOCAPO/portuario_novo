import NextImage from 'next/legacy/image';

import { useState } from 'react';

import Container from '~components/Layout/Container/Container';

import { steps, banners, texts } from './data';
import backgroundImg from './images/background1.png';
import { TBannerSteps } from './types';

import scss from './Banner.module.scss';

const Banner = () => {
  const [bannerStep, setBannerStep] = useState<TBannerSteps>('color');

  const renderDynamicText = () => {
    const text = (
      <div className={scss.dynamicText}>
        <h2 className={scss.title}>{texts[bannerStep].title}</h2>
        <p className={scss.text}>{texts[bannerStep].description}</p>
      </div>
    );

    return text;
  };

  const renderImage = () => {
    const BannerSVG = banners[bannerStep];
    const img = <BannerSVG className={scss.image} />;

    return (
      <div className={scss.imageWrapper}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={scss[step]}
            onMouseEnter={() => setBannerStep(step)}
            onMouseLeave={() => setBannerStep('color')}
          />
        ))}
        {img}
      </div>
    );
  };

  return (
    <Container className={scss.container}>
      <NextImage
        alt="Banner Principal"
        src={backgroundImg}
        layout="fill"
        objectFit="cover"
        className={scss.background}
      />
      <div className={scss.content}>
        {renderDynamicText()}
        {renderImage()}
        <span className={scss.description}>
          Neste portal, buscamos promover o diálogo entre pessoas e organizações para construir
          soluções inovadoras e sustentáveis.
        </span>
      </div>
    </Container>
  );
};

export default Banner;
