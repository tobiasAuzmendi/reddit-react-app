import React from 'react';

const Image = ({ src }) => (
  <img alt="avatar" src={src || require('../../../assets/images/shared/image-not-found.png')} onError={(e)=>{e.target.onerror = null; e.target.src="../../../assets/images/shared/image-not-found.png"}}/>
);

export default Image;
