import React from 'react';

export default function MapCard({srcUrl}) {
  return (
    <iframe
      src={srcUrl}
      width="400"
      height="300"
      style={{border:0}}
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
