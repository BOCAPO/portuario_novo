import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';

import { useState } from 'react';

import ButtonBack from '~components/Layout/ButtonBack';
import Header from '~components/Layout/Header/Header';
import { getOrganiaztionPartnerBySlug, getPartners } from '~services/Api/Partners/Partners';
import { IOrganizationProps, TContact } from '~services/Api/Partners/types';

import AboutCompany from './components/AboutCompany';
import CompanyHeader from './components/CompanyHeader';
import Localization from './components/Localization';
import PhotosContainer from './components/PhotosContainer';
import ProgramQuimea from './components/ProgramQuimea';
import SustainableActions from './components/SustainableActions';

import scss from './Companies.module.scss';

type ISocialNetworks = {
  [key in TContact]: string;
};

interface ICampaigns {
  id: number;
  title: string;
  link?: string;
  image?: string;
  profile_visibility: boolean;
}

const Empresas = ({ contacts, ...props }: IOrganizationProps) => {
  const [socialNetworks, setSocialNetworks] = useState<ISocialNetworks>(
    contacts.reduce((acc: any, item) => {
      acc[item.type] = item.link;
      return acc;
    }, {})
  );

  const renderCampaigns = (campaigns: ICampaigns[]): JSX.Element[] => {
    const visibleCampaigns = campaigns.filter((campaign) => {
      return campaign.profile_visibility;
    });

    return visibleCampaigns.map((campaign) => <ProgramQuimea key={campaign.id} info={campaign} />);
  };

  return (
    <>
      <Head>
        <title>{`${props.trading_name}`}</title>
      </Head>

      <Header />

      <main>
        <div className={scss.container}>
          <div className={scss.main}>
            <div className={scss.content}>
              <ButtonBack linkTo="/parceiros" label="Voltar" />

              <div>
                <CompanyHeader
                  image={props.logo}
                  name={props.trading_name}
                  address={props.address_str}
                  phone={props.phone}
                  email={props.email}
                  whatsapp_number={props.whatsapp_number}
                  socialNetworks={socialNetworks}
                />

                <AboutCompany
                  activity={props.activity}
                  type={props.type}
                  description={props.description}
                  requirements={props.environmental_requirements}
                />

                <div className={scss.campaingContainer}>{renderCampaigns(props.campaigns)}</div>

                {props.ods.length > 0 && <SustainableActions ods={props.ods} />}

                {props.photos.length > 0 && <PhotosContainer photos={props.photos} />}

                <Localization address={props.address_str} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = (await getPartners()).organizations;

  return {
    paths: data?.results.map((organization: { slug: string }) => {
      return { params: { slug: organization.slug } };
    }),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { data, status } = await getOrganiaztionPartnerBySlug(context.params?.slug as string);

  if (status !== 200) {
    return {
      notFound: true,
    };
  }

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 30, // 1 month
  };
};

export default Empresas;
