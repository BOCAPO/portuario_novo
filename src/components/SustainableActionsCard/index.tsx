import React, { ReactNode } from 'react';
import Accordion from '../Accordion'
import styles from './styles.module.scss'

interface Props {
  icon: string;
  objective: string;
  title: string;
  subtitle: string;
  children: ReactNode
}

const SustainableActionsCard: React.FC<Props> = ({icon, objective, title, subtitle, children}) => {
  return (
    <div className={styles.container}>
      <Accordion
        title={
          <div className={styles.titleContainer}>
            <div className={styles.titleIconAndObjective}>
              <div className={styles.icon}>
                <img src={icon} alt=""/>
              </div>
              <h1 className={styles.objective}>{objective}</h1>
            </div>
            <div className={styles.contentHeader}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
          </div>
        }
      >
        <div className={styles.content}>
          <p className={styles.text}>{children}</p>
        </div>
      </Accordion>
    </div>
  );
};

export default SustainableActionsCard;
