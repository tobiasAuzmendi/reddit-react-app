import React from 'react';
import { connect } from 'react-redux';
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

class PostList extends React.Component {

    componentDidUpdate(prevProps) {
      const { searchBoxText } = this.props;

      if (searchBoxText !== prevProps.searchBoxText) {
        if (searchBoxText) {
          this.props.selectPost(null);
          this.fetchPosts(searchBoxText, 1, null, null);
        } else {
          this.cleanUpState(true);
        }
      }
    }

    componentWillMount() {
      this.cleanUpState(true);
    }

    fetchPosts(searchWord, page, prevPageId, nextPageId) {
      this.props.setPostsLoading();

      getPosts(searchWord, page, prevPageId, nextPageId).then((response) => {
        this.props.loadPosts(this.props.searchBoxText ? response.children : []);

        this.props.setPaginationConfig({
          page,
          prevPageId: response.before,
          nextPageId: response.after
        });
      })
      .catch(() => {
        this.cleanUpState(true);
      });
    }

    cleanUpState(cleanPosts) {
      this.props.selectPost(null);
      this.props.setPaginationConfig(this.getinitialPagination());

      if (cleanPosts) {
        this.props.loadPosts([]);
      }
    }

    getinitialPagination = () => ({
      page: 0,
      prevPageId: null,
      nextPageId: null
    });

    onGetPrevPage = () => {
      const { prevPageId, page } = this.props.paginationConfig;

      this.fetchPosts(this.props.searchBoxText, page - 1, prevPageId, null);
    }

    onGetNextPage = () => {
      const { nextPageId, page } = this.props.paginationConfig;

      this.fetchPosts(this.props.searchBoxText, page + 1, null, nextPageId);
    }

    onPostSelection = (post) => {
      const readedPost = {
        ...post,
        readed: true
      };
      this.props.setPostAsReaded(readedPost);
      this.props.selectPost(readedPost);
      this.props.togglePostListVisible();
    }

    onPostDismission = (postId) => {
      this.props.dismissPost(postId);

      const selectedPost = this.props.selectedPost;
      if (selectedPost && selectedPost.id === postId) {
        this.props.selectPost(null);
      }
    }

    onAllPostsDismission = () => {
      this.props.dismissAll();
      this.cleanUpState(false);
    }

    onShowReaded = () => {
      this.props.showReaded();
      this.cleanUpState(false);
    }

    onTogglePostListVisible = () => {
      this.props.togglePostListVisible();
    }

    render() {
      const { isLoading, posts, searchBoxText, paginationConfig, postListVisible } = this.props;

      return (
        <div className={`post-list ${postListVisible ? 'visible' : ''}`}>
          <div className="view-container">
            <h1 className="title">Posts</h1>
            <div className="actions">
              <button onClick={ this.onAllPostsDismission } className="reddit-app-primary-button icon-text-button">
                <FontAwesomeIcon className="icon" icon={faTimesCircle} /> Dismiss All
              </button>
              <button onClick={ this.onShowReaded } className="reddit-app-primary-button icon-text-button">
                <FontAwesomeIcon className="icon" icon={faBookReader} /> Show Readed
              </button>
            </div>
            <div className="list-content">
              <TransitionGroup className="transition-group">
                {
                  !isLoading && !!posts.length && posts.map(post => (
                    <CSSTransition key={post.id} timeout={500} classNames="move">
                      <PostCard post={post} onCardClick={this.onPostSelection} onDismissClick={this.onPostDismission} onSaveImageClick={this.onSaveImage}/>
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
              <Paginator page={paginationConfig.page} onPrevPageClick={ this.onGetPrevPage } onNextPageClick={ this.onGetNextPage } disableNext={!paginationConfig.nextPageId && (!posts.length || posts.length < PAGE_SIZE)}/>
            }
          </div>
          {
            !postListVisible &&
            <div className="nav-buttons-column">
              <button onClick={ this.onTogglePostListVisible } className="reddit-app-primary-button">
                <FontAwesomeIcon className="icon" icon={faArrowAltCircleLeft} />
              </button>
            </div>
          }
        </div>
      );
    }

}

const mapStateToProps = ({ postList, searchBox, postDetail }) => ({
  posts: postList.posts,
  isLoading: postList.isLoading,
  paginationConfig: postList.paginationConfig,
  postListVisible: postList.postListVisible,
  searchBoxText: searchBox.text,
  selectedPost: postDetail.selectedPost
});

const mapDispatchToProps = dispatch => ({
  loadPosts: posts => dispatch(loadPosts(posts)),
  setPostsLoading: posts => dispatch(setPostsLoading(posts)),
  selectPost: post => dispatch(selectPost(post)),
  dismissPost: post => dispatch(dismissPost(post)),
  dismissAll: post => dispatch(dismissAll(post)),
  showReaded: post => dispatch(showReaded(post)),
  setPostAsReaded: postId => dispatch(setPostAsReaded(postId)),
  setPaginationConfig: page => dispatch(setPaginationConfig(page)),
  togglePostListVisible: () => dispatch(togglePostListVisible())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);