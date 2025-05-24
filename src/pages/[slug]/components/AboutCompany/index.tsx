import React from 'react';
import styles from './styles.module.scss';
import Section from '../Section';

interface Props {
  description: string | null;
  activity: string;
  type: string;
  requirements: string;
}

const AboutCompany: React.FC<Props> = ({description, activity, type, requirements}) => {
  return (
    <Section>
      <div className={styles.aboutCompany}>
        <div className={styles.aboutContainer}>
          {
            description && (
              <>
                <div>
                  <h3 className={`${styles.aboutTitle} ${styles.mb16}`}>Sobre a empresa</h3>
                  <p className={styles.aboutText}>
                    {description}
                  </p>
                </div>
                <div className={styles.divider}></div>
              </>
            )
          }
          <div>
            <div className={styles.aboutRow}>
              <div className={styles.aboutColumnTitle}>
                <h3 className={styles.aboutTitle}>Atividade</h3>
              </div>
              <p className={styles.aboutText}>{activity}</p>
            </div>
            <div className={styles.aboutRow}>
              <div className={styles.aboutColumnTitle}>
                <h3 className={styles.aboutTitle}>Tipo</h3>
              </div>
              <p className={styles.aboutText}>{type}</p>
            </div>
          </div>
        </div>
        <div className={styles.aboutContainer}>
          {
            requirements &&
            <div>
              <h3 className={`${styles.aboutTitle} ${styles.mb16}`}>Requisitos ambientais atendidos</h3>

              <p className={styles.aboutText}>{requirements}</p>
            </div>
          }
        </div>
      </div>
    </Section>
  );
};

export default AboutCompany;
