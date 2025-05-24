import { KeyboardEvent } from 'react';

import { Grid } from '@mui/material';

import DefaultLogo from './logo.png';
import { ICardProps } from './types';

import scss from './Card.module.scss';

const Card = ({ name, location, image, logo, onClick }: ICardProps) => {
  const defaultImage = logo || image || DefaultLogo.src;

  const onCardKeyPress = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (key === 'Enter') {
      if (onClick) onClick();
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        className={scss.cardContainer}
        onClick={onClick}
        onKeyPress={onCardKeyPress}
        role="button"
        tabIndex={0}
      >
        <img
          className={scss.imageContainer}
          src={defaultImage}
          width={100}
          height={100}
          alt={name}
        />
        <h1 className={scss.name}>{name}</h1>
        <p className={scss.location}>{location}</p>
      </div>
    </Grid>
  );
};

export default Card;
