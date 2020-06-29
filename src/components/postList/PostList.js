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
  setPaginationConfig
} from '../../redux/actions/postList.js';
import { selectPost } from '../../redux/actions/postDetail';
import { getPosts, PAGE_SIZE } from '../../services/PostsService';
import Spinner from '../shared/spinner/Spinner';
import Paginator from '../shared/paginator/Paginator';
import './postList.scss';
import InformativeMessage from '../shared/informativeMessage/InformativeMessage.js';
import { faTimesCircle, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostList extends React.Component {

    componentDidUpdate(prevProps) {
      const { searchBoxText } = this.props;

      if (searchBoxText !== prevProps.searchBoxText) {
        if (searchBoxText) {
          this.fetchPosts(searchBoxText, 1, null, null);
        } else {
          this.props.loadPosts([]);
          this.props.setPaginationConfig(this.getinitialPagination());
        }
      }
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
        this.setInitialState(true);
      });
    }

    setInitialState(cleanPosts) {
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
      this.setInitialState(false);
    }

    onShowReaded = () => {
      this.props.showReaded();
      this.setInitialState(false);
    }

    render() {
      const { isLoading, posts, searchBoxText, paginationConfig } = this.props;

      return (
        <div className="post-list">
          <h1 className="title">Posts</h1>
          <div className="actions">
            <button onClick={ this.onAllPostsDismission }>
              <FontAwesomeIcon className="icon" icon={faTimesCircle} /> Dismiss All
            </button>
            <button onClick={ this.onShowReaded }>
              <FontAwesomeIcon className="icon" icon={faBookReader} /> Show Readed
            </button>
          </div>
          <div className="list-content">
            {
              !isLoading && !!posts.length &&
              posts.map((post, index) => (
                <PostCard post={post} key={index} onCardClick={this.onPostSelection} onDismissClick={this.onPostDismission}/>
              ))
            }
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
            <Paginator page={paginationConfig.page} onPrevPageClick={ this.onGetPrevPage } onNextPageClick={ this.onGetNextPage } disableNext={!posts.length || posts.length < PAGE_SIZE}/>
          }
        </div>
      );
    }

}

const mapStateToProps = ({ postList, searchBox, postDetail }) => ({
  posts: postList.posts,
  isLoading: postList.isLoading,
  paginationConfig: postList.paginationConfig,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);