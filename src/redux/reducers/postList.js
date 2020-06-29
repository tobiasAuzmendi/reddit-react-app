import { getPassedTime } from '../../utils/timeHelper';

const defaultState = {
  posts: [],
  paginationConfig: {
    page: 0,
    nextPageId: null,
    prevPageId: null
  },
  readedPosts: [],
  isLoading: false
};

const mapPosts = (posts, readedPosts) => posts.map(post => ({
  id: post.data.id,
  title: post.data.title,
  author: post.data.author,
  passedTime: getPassedTime(post.data.created_utc),
  thumbnail: post.data.thumbnail !== 'self' ? post.data.thumbnail : '',
  avatar: post.data.url,
  readed: readedPosts.find(p => p.id === post.data.id) ? true : false
}));

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'LOAD_POSTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        posts: mapPosts(payload.posts, state.readedPosts)
      };
    case 'LOAD_POSTS_REQUEST':
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case 'READ_UPDATE':
      return {
        ...state,
        readedPosts: state.readedPosts.find(post => post.id === payload.post.id) ?
        [...state.readedPosts] : [...state.readedPosts, payload.post],
        posts: state.posts.map(post => post.id === payload.post.id ?
          {
            ...post,
            readed: payload.readed
          } : post
        )
      };
    case 'SHOW_READED':
      return {
        ...state,
        posts: state.readedPosts
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
    case 'PAGINATION_CONFIG_UPDATE':
        return {
          ...state,
          paginationConfig: payload.paginationConfig
        };
    default:
      return state;
  }
}

export default reducer;