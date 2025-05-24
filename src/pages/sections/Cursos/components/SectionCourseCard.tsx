import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { ISectionCourseCard } from './types';

import scss from './SectionCourseCard.module.scss';

const SectionCourseCard = ({ title, width, image, price, oldPrice, link, date, courseAvailabilityDate }: ISectionCourseCard) => {
  return (
    <Card sx={{ width, minHeight: '50rem' }} className={scss.courseCardContainer}>
      <a href={link} target="_blank" rel="noreferrer">
        <CardMedia component="img" image={image} alt={title} />
        <CardContent className={scss.cardContentContainer}>
          <h2 className={scss.cardTitle}>{title}</h2>
          
          {/* Container bottom */}
          <div>
            {/* Bottom with price and date */}
            <div className={scss.cardBottom}>
              <div className={scss.cardDate}>
                {date}
              </div>

              <div>
                <h3 className={`${scss.oldPrice} ${!oldPrice && scss.notOldPrice}`}>
                  {oldPrice || 'Sem preço antigo'}
                </h3>
                {Number(price) !== 0 ? (
                  <h3 className={scss.cardPrice}>{price}</h3>
                ) : (
                  <h3 className={scss.cardPrice}>GRÁTIS</h3>
                )}
              </div>
            </div>

            {/* Availability date */}
            {courseAvailabilityDate &&
              <div className={scss.cardAvailabilityDate}>
                <span>*Disponível para compra até {courseAvailabilityDate}</span>
              </div>
            }
          </div>
        </CardContent>
      </a>
    </Card>
  );
};

export default SectionCourseCard;
