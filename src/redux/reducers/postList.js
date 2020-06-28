import { getPassedTime } from '../../utils/timeHelper';

const defaultState = {
  posts: [],
  isLoading: false
};

const mapPosts = (posts) => posts.map(post => ({
  id: post.data.id,
  title: post.data.title,
  author: post.data.author,
  passedTime: getPassedTime(post.data.created_utc),
  thumbnail: post.data.thumbnail !== 'self' ? post.data.thumbnail : '',
  avatar: post.data.url,
  readed: false
}));

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'LOAD_POSTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        posts: mapPosts(payload.posts)
      };
    case 'LOAD_POSTS_REQUEST':
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case 'READ_UPDATE':
      return {
        ...state,
        posts: state.posts.map(post => post.id === payload.postId ?
          {
            ...post,
            readed: payload.readed
          } : post
        )
      };
    case 'DISMISS_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload.postId)
      };
    case 'DISMISS_ALL':
        return {
          ...state,
          posts: []
        };
    default:
      return state;
  }
}

export default reducer;