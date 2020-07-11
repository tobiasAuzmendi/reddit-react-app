import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual, useStore } from "react-redux";
import PostCard from './postCard/PostCard.js';
import {
  loadPosts,
  setPostAsReaded,
  setPostsLoading,
  dismissPost,
  dismissAll,
  showReaded,
  setPaginationConfig,
  togglePostListVisible
} from '../../redux/actions/postList.js';
import { selectPost } from '../../redux/actions/postDetail';
import { getPosts, PAGE_SIZE } from '../../services/PostsService';
import Spinner from '../shared/spinner/Spinner';
import Paginator from '../shared/paginator/Paginator';
import './postList.scss';
import InformativeMessage from '../shared/informativeMessage/InformativeMessage.js';
import { faTimesCircle, faBookReader, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const PostList = () => {
  const paginationConfig = useSelector(state => state.postList.paginationConfig, shallowEqual);
  const isLoading = useSelector(state => state.postList.isLoading);
  const posts = useSelector(state => state.postList.posts, shallowEqual);
  const postListVisible = useSelector(state => state.postList.postListVisible);
  const searchBoxText = useSelector(state => state.searchBox.text);
  const store = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchBoxText) {
      dispatch(selectPost(null));
      fetchPosts(searchBoxText, 1, null, null);
    } else {
      cleanUpState(true);
    }
  }, [searchBoxText]);

  useEffect(() => {
    // componentDidUnmount equivalent
    return () => {
      cleanUpState(true);
    }
  }, []);

  const cleanUpState = (cleanPosts) => {
    dispatch(selectPost(null));
    dispatch(setPaginationConfig(getinitialPagination()));

    if (cleanPosts) {
      dispatch(loadPosts([]));
    }
  }

  const fetchPosts = (searchWord, page, prevPageId, nextPageId) => {
    dispatch(setPostsLoading());

    getPosts(searchWord, page, prevPageId, nextPageId).then((response) => {
      dispatch(loadPosts(searchBoxText ? response.children : []));

      dispatch(setPaginationConfig({
        page,
        prevPageId: response.before,
        nextPageId: response.after
      }));
    })
    .catch(() => {
      cleanUpState(true);
    });
  }

  const getinitialPagination = () => ({
    page: 0,
    prevPageId: null,
    nextPageId: null
  });

  const onGetPrevPage = useCallback(() => {
    const { prevPageId, page } = paginationConfig;

    fetchPosts(searchBoxText, page - 1, prevPageId, null);
  }, [dispatch]);

  const onGetNextPage = useCallback(() => {
    const { nextPageId, page } = paginationConfig;

    fetchPosts(searchBoxText, page + 1, null, nextPageId);
  }, [dispatch]);

  const onPostSelection = useCallback((post) => {
    const readedPost = {
      ...post,
      readed: true
    };
    dispatch(setPostAsReaded(readedPost));
    dispatch(selectPost(readedPost));
    dispatch(togglePostListVisible());
  }, [dispatch]);

  const onPostDismission = useCallback((postId) => {
    dispatch(dismissPost(postId));

    const selectedPost = store.getState().postDetail.selectedPost;
    if (selectedPost && selectedPost.id === postId) {
      dispatch(selectPost(null));
    }
  }, [dispatch]);

  const onAllPostsDismission =  useCallback(() => {
    dispatch(dismissAll());
    cleanUpState(false);
  }, [dispatch]);

  const onShowReaded = useCallback(() => {
    dispatch(showReaded());
    cleanUpState(false);
  }, [dispatch]);

  const onTogglePostListVisible = useCallback(() => {
    dispatch(togglePostListVisible());
  }, [dispatch]);

  return (
    <div className={`post-list ${postListVisible ? 'visible' : ''}`}>
      <div className="view-container">
        <h1 className="title">Posts</h1>
        <div className="actions">
          <button onClick={ onAllPostsDismission } className="reddit-app-primary-button icon-text-button">
            <FontAwesomeIcon className="icon" icon={faTimesCircle} /> Dismiss All
          </button>
          <button onClick={ onShowReaded } className="reddit-app-primary-button icon-text-button">
            <FontAwesomeIcon className="icon" icon={faBookReader} /> Show Readed
          </button>
        </div>
        <div className="list-content">
          <TransitionGroup className="transition-group">
            {
              !isLoading && !!posts.length && posts.map(post => (
                <CSSTransition key={post.id} timeout={500} classNames="move">
                  <PostCard post={post} onCardClick={onPostSelection} onDismissClick={onPostDismission}/>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
          {
            isLoading && <Spinner />
          }
          {
            !isLoading && searchBoxText && !posts.length &&
            <InformativeMessage text="There are no results for the specified search."/>
          }
          {
            !isLoading && !searchBoxText && !posts.length &&
            <InformativeMessage text="Enter a Subreddit name in the search box above in order to see associated posts."/>
          }
        </div>
        {
          !isLoading && !!posts.length && paginationConfig && paginationConfig.page !== 0 &&
          <Paginator page={paginationConfig.page} onPrevPageClick={ onGetPrevPage } onNextPageClick={ onGetNextPage } disableNext={!paginationConfig.nextPageId && (!posts.length || posts.length < PAGE_SIZE)}/>
        }
      </div>
      {
        !postListVisible &&
        <div className="nav-buttons-column">
          <button onClick={ onTogglePostListVisible } className="reddit-app-primary-button">
            <FontAwesomeIcon className="icon" icon={faArrowAltCircleLeft} />
          </button>
        </div>
      }
    </div>
  );
};

export default PostList;