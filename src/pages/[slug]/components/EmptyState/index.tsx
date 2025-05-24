import React from 'react';
import styles from './styles.module.scss'

interface Props {
  text: string
}

const EmptyState: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.emptyState}>
      <p>{text}</p>
    </div>
  );
};

export default EmptyState;
