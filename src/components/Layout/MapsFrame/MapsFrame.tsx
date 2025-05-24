import React from 'react';

interface MapsFrameProps {
  address: string;
  width?: string;
  height?: string;
}

const MapsFrame = ({ address, width = '600px', height = '400px' }: MapsFrameProps) => {
  const API_KEY = 'AIzaSyDGnzFeG3rLhrgtRTzrK6nHw7jW9uqbRvY';

  return (
    <iframe
      width={width}
      height={height}
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${address}`}
    ></iframe>
  );
};

export default MapsFrame;
