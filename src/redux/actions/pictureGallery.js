export const addPictureToGallery = post => ({
  type: 'ADD_PICTURE_TRIGGERED',
  payload: {
    picture: {
      postId: post.id,
      url: post.thumbnail
    }
  }
});

export const removePictureFromGallery = postId => ({
  type: 'REMOVE_PICTURE_TRIGGERED',
  payload: {
    postId
  }
});

