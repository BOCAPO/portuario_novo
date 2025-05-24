import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { ISectionNewsCardProps } from './types';

import scss from './SectionNewsCard.module.scss';

const SectionNewsCard = ({ title, width, date, image, style, link }: ISectionNewsCardProps) => {
  return (
    <Link href={link}>
      <Card sx={{ width }} style={style} className={scss.blogCardContainer}>
        <CardMedia className={scss.cardMediaImg} component="img" image={image} alt={title} />
        <CardContent className={scss.cardContentContainer}>
          <h2 className={scss.cardTitle}>{title}</h2>
          <p className={scss.date}>{date}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SectionNewsCard;
