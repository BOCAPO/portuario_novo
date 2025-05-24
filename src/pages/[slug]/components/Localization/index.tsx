import React from 'react';
import MapsFrame from '~components/Layout/MapsFrame';
import Section from '../Section';

interface Props {
  address: string
}

const Localization: React.FC<Props> = ({address}) => {
  return (
    <Section title={'Localização'}>
      {address && <MapsFrame width={'100%'} height={'600px'} address={address}/>}
    </Section>
  );
};

export default Localization;
