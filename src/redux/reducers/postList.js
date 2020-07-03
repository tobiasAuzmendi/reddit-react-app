import { getPassedTime } from '../../utils/timeHelper';

const defaultState = {
  posts: [],
  paginationConfig: {
    page: 0,
    nextPageId: null,
    prevPageId: null
  },
  readedPosts: [],
  isLoading: false,
  postListVisible: true
};

const mapPosts = (posts, readedPosts) => posts.map(post => ({
  id: post.data.id,
  title: post.data.title,
  author: post.data.author,
  passedTime: getPassedTime(post.data.created_utc),
  thumbnail: post.data.thumbnail !== 'self' ? post.data.thumbnail : '',
  readed: readedPosts.find(p => p.id === post.data.id) ? true : false,
  numberOfComments: post.data.num_comments
}));

function reducer(state = defaultState, { type, payload }) {
  switch(type) {
    case 'LOAD_POSTS_SUCCEEDED':
      return {
        ...state,
        isLoading: false,
        posts: mapPosts(payload.posts, state.readedPosts)
      };
    case 'LOAD_POSTS_REQUESTED':
      return {
        ...state,
        isLoading: payload.isLoading
      };
    case 'POST_READED':
      return {
        ...state,
        readedPosts: state.readedPosts.some(post => post.id === payload.post.id) ?
        [...state.readedPosts] : [...state.readedPosts, payload.post],
        posts: state.posts.map(post => post.id === payload.post.id ?
          {
            ...post,
            readed: payload.readed
          } : post
        )
      };
    case 'SHOW_READED_TRIGGERED':
      return {
        ...state,
        posts: state.readedPosts
      };
    case 'DISMISS_POST_TRIGGERED':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload.postId)
      };
    case 'DISMISS_ALL_TRIGGERED':
        return {
          ...state,
          posts: []
        };
    case 'PAGINATION_CONFIG_UPDATED':
        return {
          ...state,
          paginationConfig: payload.paginationConfig
        };
    case 'POST_LIST_VISIBILITY_TOGGLED':
        return {
          ...state,
          postListVisible: !state.postListVisible
        };
    default:
      return state;
  }
}

export default reducer;