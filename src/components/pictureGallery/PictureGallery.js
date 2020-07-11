import React, { useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './pictureGallery.scss';
import InformativeMessage from '../shared/informativeMessage/InformativeMessage.js';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ClickableImage from '../shared/clickableImage/ClickableImage';
import { removePictureFromGallery } from '../../redux/actions/pictureGallery';
import { info } from '../../services/NotificationsService';

const PictureGallery = () => {
  const pictures = useSelector(state => state.pictureGallery.pictures);
  const dispatch = useDispatch();

  const onSaveImageRemove = useCallback((post) => {
    dispatch(removePictureFromGallery(post));
    info('Image removed.');
  }, [dispatch]);

  return (
    <div className="picture-gallery view-container">
      <h1 className="title">Pictures Gallery</h1>
      <div className="gallery-content row">
        {
          !!pictures.length &&
          pictures.map(picture => (
            <div className="picture-container col-sm-3" key={picture.postId}>
              <ClickableImage faIcon={faTimesCircle} onImageClicked={() => { onSaveImageRemove(picture.postId) }} src={picture.url || require('../../assets/images/shared/image-not-found.png')}/>
            </div>
          ))
        }
        {
          !pictures.length && <InformativeMessage text="At the moment there are no pictures in the gallery. Look for new posts in the posts section and save its photos to view them here."/>
        }
      </div>
    </div>
  );
}

export default React.memo(PictureGallery);
