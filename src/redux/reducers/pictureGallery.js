const defaultState = {
  pictures: []
};

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'ADD_PICTURE_TRIGGERED':
      return {
        pictures: state.pictures.some(picture => picture.postId === payload.picture.postId) ?
        [...state.pictures] : [...state.pictures, payload.picture]
      };
    case 'REMOVE_PICTURE_TRIGGERED':
      return {
        pictures: state.pictures.filter(picture => picture.postId !== payload.postId)
      };
    default:
      return state;
  }
}
export default reducer;