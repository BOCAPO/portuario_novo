import { Grid } from '@mui/material';

import logo from './logo.png';
import { ICardProps } from './types';

import scss from './Card.module.scss';

const Card = (props: ICardProps) => {
  const image = props.logo || props.image || logo.src;

  const onCardKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      if (props.onClick) props.onClick();
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        className={scss.cardContainer}
        onClick={props.onClick}
        onKeyPress={onCardKeyPress}
        role="button"
        tabIndex={0}
      >
        <img
          alt={props.name}
          className={scss.imageContainer}
          src={image}
          width={100}
          height={100}
        />
        <h1 className={scss.name}>{props.name}</h1>
        <p className={scss.location}>{props.location}</p>
      </div>
    </Grid>
  );
};

export default Card;
