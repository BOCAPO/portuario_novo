/* eslint-disable camelcase */
import Head from 'next/head';

import { useState } from 'react';

import { Button, CircularProgress } from '@mui/material';
import CardEventos from '~components/Layout/CardEventos/CardEventos';
import Header from '~components/Layout/Header/Header';
import RegisterEventDrawer from '~components/Layout/RegisterEventDrawer/RegisterEventDrawer';
import SolidBanner from '~components/Layout/SolidBanner/SolidBanner';

import { useAllEventos } from '~hooks/query/useEventos';

import { IEventsProps } from './types';

import styles from './Eventos.module.scss';

export default function Eventos() {
  const allEventos = useAllEventos();
  const [isOpen, setIsOpen] = useState(false);

  const showEventsList = () => {
    return allEventos?.results.map((event: IEventsProps, index: number) => {
      const { description, end_date, image_dir, local, start_date, title, webpage_url } = event;

      return (
        <CardEventos
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          title={title}
          image_dir={image_dir}
          description={description}
          end_date={end_date}
          start_date={start_date}
          webpage_url={webpage_url}
          local={local}
        />
      );
    });
  };

  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <RegisterEventDrawer open={isOpen} onClose={() => setIsOpen(false)} />

          <section className={styles.eventsContainer}>
            <div className={styles.newEventsContainer}>
              <Button onClick={() => setIsOpen(true)} className={styles.newEventsButton}>
                Sabe de algum evento? Cadastre e divulgue ele aqui!
              </Button>
              <p className={styles.newEventsText}>
                Veja os eventos que estão acontecendo na área ambiental:
              </p>
            </div>
            <div className={styles.cardsEventsContainer}>
              {allEventos === 'loading' ? <CircularProgress /> : showEventsList()}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
