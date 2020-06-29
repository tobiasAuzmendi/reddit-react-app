export const loadPosts = posts => ({
  type: 'LOAD_POSTS_SUCCESS',
  payload: {
    posts
  }
});

export const setPostsLoading = () => ({
  type: 'LOAD_POSTS_REQUEST',
  payload: {
    isLoading: true
  }
});

export const setPostAsReaded = (post) => ({
  type: 'READ_UPDATE',
  payload: {
    readed: true,
    post
  }
});

export const showReaded = (post) => ({
  type: 'SHOW_READED'
});

export const dismissPost = (postId) => ({
  type: 'DISMISS_POST',
  payload: {
    postId
  }
});

export const dismissAll = () => ({
  type: 'DISMISS_ALL'
});

export const setPaginationConfig = (paginationConfig) => ({
  type: 'PAGINATION_CONFIG_UPDATE',
  payload: {
    paginationConfig
  }
});