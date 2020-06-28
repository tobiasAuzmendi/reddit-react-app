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

export const setPostAsReaded = (postId) => ({
  type: 'READ_UPDATE',
  payload: {
    readed: true,
    postId
  }
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