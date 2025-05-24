import React, { ReactNode } from 'react';
import styles from './styles.module.scss'

interface Props {
  title?: string;
  grey?: boolean;
  className?: any;
  children: ReactNode;
}

const Section: React.FC<Props> = ({title, grey, className, children}) => {
  return (
    <div className={`${styles.section} ${grey && styles.sectionGrey} ${className ?? ''}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </div>
  );
};

export default Section;
