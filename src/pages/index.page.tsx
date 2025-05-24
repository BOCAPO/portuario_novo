import Head from 'next/head';

import Header from '~components/Layout/Header/Header';
import Banner from './sections/Banner/Banner';
import Cursos from './sections/Cursos/Cursos';
import Noticias from './sections/Noticias/Noticias';
import Partners from './sections/Partners/Partners';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { Button, Fab } from '@mui/material';

import styles from './Home.module.scss';

export default function Home() {
  // const pwaButton = () => {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     const deferredPrompt = e;

  //     // deferredPrompt.prompt();
  //     // @ts-ignore
  //     style.display = 'block';
  //   });
  // };

  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div className={styles.container}>
        <Header />

        <main className={styles.main}>
          <Banner />
          <Partners />
          <Cursos />
          <Noticias />
          {/* <Fab disabled aria-label="like">
            <FavoriteIcon />
          </Fab>
          <Button
          onClick={()=>pwaButton()}>
            Instalar Econext
          </Button> */}
        </main>
      </div>
    </>
  );
}
