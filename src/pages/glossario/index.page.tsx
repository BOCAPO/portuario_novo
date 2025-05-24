import Head from 'next/head';

import Header from '~components/Layout/Header/Header';
import { useAGlossary } from '~hooks/query/useAbout';

import SolidBanner from '../../components/Layout/SolidBanner/SolidBanner';
import styles from './Glossario.module.scss';
export default function Glossario() {
  const data = useAGlossary();
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          {data !== 'loading' &&
            <div
              dangerouslySetInnerHTML={{ __html: `${data[0].glossary}` }}
              className={styles.content}
            />
          }
        </div>
      </main>
    </>
  );
}
