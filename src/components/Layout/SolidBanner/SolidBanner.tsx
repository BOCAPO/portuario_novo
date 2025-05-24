import NextImage from 'next/legacy/image';

import backgroundImg from './images/background1.png';
import { ISolidBannerProps } from './types';

import scss from './SolidBanner.module.scss';

const SolidBanner = (props: ISolidBannerProps) => {
  const contentClass = [scss.content];
  if (props.backgroundColor) contentClass.push(scss[props.backgroundColor]);
  return (
    <div className={scss.container}>
      <NextImage
        alt="Banner Econext"
        src={backgroundImg}
        layout="fill"
        objectFit="cover"
        className={scss.background}
      />
      <div className={contentClass.join(' ')}>
        <h1 className={scss.text}>{props.title}</h1>
      </div>
    </div>
  );
};

export default SolidBanner;
