import Head from 'next/head';

import Header from '~components/Layout/Header/Header';
import { useAllInfoAboutQuimea } from '~hooks/query/useAbout';

//import SolidBanner from '../../components/Layout/SolidBanner/SolidBanner';
import styles from './Sobre.module.scss';
export default function About() {
  const data = useAllInfoAboutQuimea();
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          {data !== 'loading' && (
            <div
              dangerouslySetInnerHTML={{ __html: `${data[0].about_quimea}` }}
              className={styles.content}
            />
          )}
        </div>
      </main>
    </>
  );
}
