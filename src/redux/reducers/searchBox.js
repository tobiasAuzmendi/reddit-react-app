const defaultState = {
  text: ''
};

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'SEARCH_BOX_TEXT_CHANGED':
      return {
        ...state,
        text: payload.searchText
      };
    default:
      return state;
  }
}
export default reducer;