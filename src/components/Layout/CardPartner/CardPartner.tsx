import scss from './CardPartner.module.scss';
import { ICardPartner } from './type';

const CardPartner = (props: ICardPartner) => {
  return (
    <div className={scss.cardPartner}>
      <img src={props.image} alt="parceiro" className={scss.partnerImage} />
      <h3 className={scss.partnerTitle}>{props.title}</h3>
      <h4 className={scss.partnerCity}>{props.city}</h4>
    </div>
  );
};
export default CardPartner;
