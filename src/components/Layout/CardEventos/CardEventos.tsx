import { FC } from 'react';

import { Button } from '@mui/material';

import { ICardEventos } from './types';

import scss from './CardEventos.module.scss';

const CardEventos: FC<ICardEventos> = (events: ICardEventos) => {
  const { description, end_date, image_dir, start_date, title, webpage_url } = events;

  const dateFormat = (
    startDate = new Date().toISOString().slice(0, 10),
    endDate = new Date().toISOString().slice(0, 10)
  ) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    if (startDate === endDate) {
      return `Dia ${newStartDate.getUTCDate()} de ${newEndDate.toLocaleString('pt-BR', {
        month: 'long',
      })} de ${newEndDate.getUTCFullYear()}`;
    }

    return `De ${newStartDate.getUTCDate()} a ${newEndDate.getUTCDate()} de ${newEndDate.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )} de ${newEndDate.getUTCFullYear()}`;
  };

  return (
    <div className={scss.cardEventosContainer}>
      <div className={scss.imageContainer}>
        <img
          className={scss.image}
          src={image_dir || 'https://cdn-icons-png.flaticon.com/512/739/739249.png'}
          alt="Imagem do evento"
        />
      </div>

      <div className={scss.eventInfo}>
        <h1 className={scss.eventTitle}>{title || 'Categoria não cadastrada.'}</h1>
        <strong className={scss.eventDate}>
          {start_date && <>{dateFormat(start_date, end_date)}</>}
        </strong>
        <p className={scss.eventDescription}>{description}</p>
        {webpage_url && (
          <Button className={scss.button} variant="outlined" href={webpage_url} target="_blank">
            Ir para site
          </Button>
        )}
      </div>
    </div>
  );
};
export default CardEventos;
