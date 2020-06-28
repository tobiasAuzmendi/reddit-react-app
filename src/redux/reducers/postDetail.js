const defaultState = {
  selectedPost: null
};

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'POST_SELECTED':
      return {
        selectedPost: payload.post
      };
    default:
      return state;
  }
}
export default reducer;