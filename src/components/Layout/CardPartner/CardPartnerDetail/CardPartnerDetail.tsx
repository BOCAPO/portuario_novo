import scss from './CardPartnerDetail.module.scss';
import MapsFrame from '../../MapsFrame';

const CardPartnerDetail = (props: any) => {
  return (
    <div className={scss.cardPartnerContainer}>
      <div className={scss.partnerImage}>
        <img width={'100%'} src={props.data.image || props.data.logo} alt={props.data.first_name} />
      </div>

      <div className={scss.contentOfPartner}>
        <h1 className={scss.partnerTitle}>
          {props.data.trading_name
            ? props.data.trading_name
            : `${props.data.first_name} ${props.data.last_name}`}
        </h1>

        {props.data.company_name && (
          <p className={scss.info}>
            <strong>Razão social: </strong>
            {props.data.company_name}
          </p>
        )}

        <p className={scss.info}>
          <strong>E-mail: </strong>
          {props.data.email}
        </p>

        {props.data.position && (
          <p className={scss.info}>
            <strong>Formação acadêmica: </strong>
            {props.data.education}
          </p>
        )}

        {props.data.phone && (
          <p className={scss.info}>
            <strong>Telefone: </strong>
            {props.data.phone}
          </p>
        )}

        {props.data.whatsapp_number && (
          <p className={scss.info}>
            <strong>WhatsApp: </strong>
            {props.data.whatsapp_number}
          </p>
        )}

        {props.data.address_str && (
          <p className={scss.info}>
            <strong>Endereço: </strong>
            {props.data.address_str.split(/;/g).map((subText: any, index: number) => (
              <p key={index}>{subText}</p>
            ))}
          </p>
        )}

        {props.data.position && (
          <p className={scss.info}>
            <strong>Profissão: </strong>
            {props.data.position}
          </p>
        )}

        {props.data.cnpj && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>CNPJ</h3>
            <p className={scss.info}>{props.data.cnpj}</p>
          </div>
        )}

        {props.data.description && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Soluções Ambientais</h3>
            <p className={scss.info}>{props.data.description}</p>
          </div>
        )}

        {props.data.type && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Tipo</h3>
            <p className={scss.info}>{props.data.type}</p>
          </div>
        )}

        {props.data.activity && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Atividade</h3>
            <p className={scss.info}>{props.data.activity}</p>
          </div>
        )}

        {props.data.activity_field && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Atuação</h3>
            <p className={scss.info}>{props.data.activity_field}</p>
          </div>
        )}

        {props.data.abstract && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Resumo</h3>
            <p className={scss.info}>{props.data.abstract}</p>
          </div>
        )}

        {props.data.residues?.length > 1 && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Resíduos</h3>
            {props.data.residues.map((residue: string, index: number) => {
              return (
                <p key={index} className={scss.info}>
                  {residue}
                </p>
              );
            })}
          </div>
        )}

        {props.data.solutions?.length > 0 && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Soluções</h3>
            {props.data.solutions.map((solution: string, index: number) => {
              return (
                <p key={index} className={scss.info}>
                  {solution}
                </p>
              );
            })}
          </div>
        )}

        {props.data.campaigns?.length > 0 && (
          <div className={scss.description}>
            <h3 className={scss.descriptionTitle}>Campanhas</h3>
            {props.data.campaigns.map((campaign: string, index: number) => {
              return (
                <p key={index} className={scss.info}>
                  {campaign}
                </p>
              );
            })}
          </div>
        )}
        {props.data.address_str && <MapsFrame address={props.data.address_str} />}
      </div>
    </div>
  );
};
export default CardPartnerDetail;
