import React from 'react';

import { ICampaigns } from '~services/Api/Partners/types';

import styles from './styles.module.scss';

interface Props {
  info: ICampaigns;
}

const ProgramQuimea: React.FC<Props> = ({ info }) => {
  return (
    <div className={styles.programQuimea}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img src={info.image} alt={info.title} />
        </div>
        <div className={styles.infos}>
          <h2>
            Participante do <strong>{info.title}</strong>
          </h2>
          <a href={info.link} target="_blank" rel="noreferrer">
            Saiba mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProgramQuimea;
