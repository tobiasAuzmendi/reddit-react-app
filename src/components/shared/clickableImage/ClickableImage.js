import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './clickableImage.scss';
import Image from '../Image/Image';

const ClickableImage = ({ faIcon, onImageClicked, src}) => (
  <div className="clickable-image">
    <Image src={src}/>
    <div className="button-wrapper">
      <button onClick={onImageClicked} className="reddit-app-primary-button">
        <FontAwesomeIcon className="icon" icon={faIcon} />
      </button>
    </div>
  </div>
);

export default React.memo(
  ClickableImage,
  (prevProps, nextProps) => prevProps.src === nextProps.src
);
