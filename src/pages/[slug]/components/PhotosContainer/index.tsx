import React, { FunctionComponent } from 'react';
import { IPhotos } from '~services/Api/Partners/types';
import styles from './styles.module.scss';
import scss from '../../Companies.module.scss';
import Section from '../Section';
import EmptyState from '../EmptyState';

interface Props {
  photos: IPhotos[];
}

const PhotosContainer: React.FC<Props> = ({photos}) => {
  return (
    <Section title={'Fotos'} grey className={styles.sectionMV128}>
      {
        photos.length > 0 &&
        <div className={styles.photoContainer}>
          {photos.map((item, key) => (
            <div className={styles.photoColumn} key={key}>
              <img src={item.file} alt={`Foto ${key}`}/>
            </div>
          ))}
        </div>
      }

      {
        photos.length === 0 &&
        <EmptyState text={'Não há imagens para exibir'} />
      }
    </Section>
  );
};

export default PhotosContainer;
