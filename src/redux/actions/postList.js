export const loadPosts = posts => ({
  type: 'LOAD_POSTS_SUCCEEDED',
  payload: {
    posts
  }
});

export const setPostsLoading = () => ({
  type: 'LOAD_POSTS_REQUESTED',
  payload: {
    isLoading: true
  }
});

export const setPostAsReaded = (post) => ({
  type: 'POST_READED',
  payload: {
    readed: true,
    post
  }
});

export const showReaded = () => ({
  type: 'SHOW_READED_TRIGGERED'
});

export const dismissPost = (postId) => ({
  type: 'DISMISS_POST_TRIGGERED',
  payload: {
    postId
  }
});

export const dismissAll = () => ({
  type: 'DISMISS_ALL_TRIGGERED'
});

export const setPaginationConfig = (paginationConfig) => ({
  type: 'PAGINATION_CONFIG_UPDATED',
  payload: {
    paginationConfig
  }
});

export const togglePostListVisible = () => ({
  type: 'POST_LIST_VISIBILITY_TOGGLED'
});