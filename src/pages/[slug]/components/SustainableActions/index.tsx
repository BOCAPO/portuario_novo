import React from 'react';
import SustainableActionsCard from '~components/SustainableActionsCard';
import { IOds } from '~services/Api/Partners/types';
import style from './styles.module.scss';
import Section from '../Section';
import EmptyState from '../EmptyState';


interface Props {
  ods: IOds[]
}

const SustainableActions: React.FC<Props> = ({ ods }) => {
  return (
    <Section title={'Ações sustentáveis desenvolvidas pela empresa'}>
      {
        ods.length > 0 &&
        <div className={style.sustainableActions}>
          {
            ods.map((item, key) => (
              <SustainableActionsCard
                key={key}
                title={item.ods_subtitle}
                subtitle={item.ods_description}
                objective={item.ods_title}
                icon={item.icon}
              >
                {item.actions}
              </SustainableActionsCard>
            ))
          }
        </div>
      }

      {
        ods.length === 0 &&
        <EmptyState text={'Não há Ações sustentavéis cadastradas'} />
      }
      <p className={style.sustainableText}>Para saber mais sobre cada um das ODS da ONU, <a
        href="/conteudos/objetivos-desenvolvimento-sustentavel" target="_blank">Clique aqui</a></p>
    </Section>
  );
};

export default SustainableActions;
