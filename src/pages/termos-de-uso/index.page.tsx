import React  from 'react';
import Head from "next/head";
import Header from "~components/Layout/Header/Header";
import styles from "./styles.module.scss"
import {instance} from "~services/Api/http";
import SolidBanner from '~components/Layout/SolidBanner/SolidBanner';

const TermsOfUse: React.FC = ({ terms }: any) => {
  return (
    <>
      <Head>
        <title>Econext</title>
      </Head>
      <div>
        <Header />
        <main className={styles.main}>
          <div
            className={styles.container}
            dangerouslySetInnerHTML={{ __html: `${terms.results[0].cookies_policy}` }}
          />
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any){
  try {

    const {data} = await instance.get('/portal/terms');

    return {
      props: {
        terms: data,
      },
    };
  } catch (e) {
    return {
      props: {
        terms: [],
      },
    };
  }
}
export default TermsOfUse;
