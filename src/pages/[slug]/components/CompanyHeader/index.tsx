import React from 'react';
import {Tooltip} from '@mui/material';
import scss from './styles.module.scss'
import { TContact } from '~services/Api/Partners/types';

type ISocialNetworks = {
  [key in TContact]: string;
};

interface Props {
  image: string;
  name: string;
  address: string;
  phone: string | null;
  email: string | null;
  whatsapp_number: string | null;
  socialNetworks: ISocialNetworks;
}

const CompanyHeader: React.FC<Props> = ({image, name, address, phone, email, whatsapp_number, socialNetworks}) => {
  const redirectSocial = (type: string, value: string | null, disabled?: boolean) => {
    if (disabled) return;

    if (type === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?phone=${value}`, '_blank')
      return;
    }

    window.open(value ?? '', '_blank')
  }

  return (
    <div className={scss.companyInfoContainer}>
      <div className={scss.companyAvatar}>
        <img 
          src={image} 
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://quimea.s3.us-east-2.amazonaws.com/org.jpg";
          }}
        />
      </div>
      <div className={scss.companyAllInfos}>
        <div className={scss.companyInfos}>
          <h1 className={scss.companyName}>{name}</h1>
          <div>
            <div className={scss.companyInfoTextRow}>
              <i className={`icon icon-location ${scss.fs20}`}/>
              <p className={scss.companyInfoText}>
                {address}
              </p>
            </div>
            <div className={scss.companyInfoTextRow}>
              <i className={`icon icon-phone-outline ${scss.fs20}`}/>
              <p className={scss.companyInfoText}>
                {phone ?? 'Não informado'}
              </p>
            </div>
            <div className={scss.companyInfoTextRow}>
              <i className='icon icon-email'/>
              <p className={scss.companyInfoText}>
                {email ?? 'Não informado'}
              </p>
            </div>
          </div>
        </div>
        <div className={scss.allSocialContainer}>
          <div className={scss.socialContainer}>
            <Tooltip title={socialNetworks.linkedin ? 'Ver no linkedin' : 'não informado'}
                     placement={'top'}>
              <div className={`${scss.socialColumn} ${!socialNetworks.linkedin && scss.disabled}`}
                   onClick={() => redirectSocial('linkedin', socialNetworks.linkedin, !socialNetworks.linkedin)}>
                <i className="icon icon-linkedin"></i>
              </div>
            </Tooltip>
            <Tooltip title={socialNetworks.instagram ? 'Ver no instagram' : 'não informado'}
                     placement={'top'}>
              <div className={`${scss.socialColumn} ${!socialNetworks.instagram && scss.disabled}`}
                   onClick={() => redirectSocial('instagram', socialNetworks.instagram, !socialNetworks.instagram)}>
                <i className="icon icon-instagram"></i>
              </div>
            </Tooltip>
            <Tooltip title={socialNetworks.facebook ? 'Ver no Facebook' : 'não informado'}
                     placement={'top'}>
              <div className={`${scss.socialColumn} ${!socialNetworks.facebook && scss.disabled}`}
                   onClick={() => redirectSocial('facebook', socialNetworks.facebook, !socialNetworks.facebook)}>
                <i className="icon icon-facebook"></i>
              </div>
            </Tooltip>
            <Tooltip title={socialNetworks.twitter ? 'Ver no Twitter' : 'não informado'}
                     placement={'top'}>
              <div className={`${scss.socialColumn} ${!socialNetworks.twitter && scss.disabled}`}
                   onClick={() => redirectSocial('twitter', socialNetworks.twitter, !socialNetworks.twitter)}>
                <i className="icon icon-twitter"></i>
              </div>
            </Tooltip>
            <Tooltip title={whatsapp_number ? 'Falar por  WhatsApp' : 'não informado'}
                     placement={'top'}>
              <div className={`${scss.socialColumn} ${!whatsapp_number && scss.disabled}`}
                   onClick={() => redirectSocial('whatsapp', whatsapp_number, !whatsapp_number)}>
                <i className={`icon icon-whatsapp ${scss.fs22}`}></i>
              </div>
            </Tooltip>
          </div>
          <button
            onClick={() => redirectSocial('site', socialNetworks.site, !socialNetworks.site)}
            disabled={!socialNetworks.site}
            className={scss.button}>
            Acessar site
          </button>
        </div>
      </div>
    </div>

  );
};

export default CompanyHeader;
