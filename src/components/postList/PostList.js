import React from 'react';
import { connect } from 'react-redux';
import PostCard from './postCard/PostCard.js';
import { loadPosts, setPostsLoading } from '../../redux/actions/postList.js';
import { selectPost } from '../../redux/actions/postDetail';
import { getPosts } from '../../services/PostsService';
import Spinner from '../shared/spinner/Spinner';
import './postList.scss';
import InformativeMessage from '../shared/informativeMessage/InformativeMessage.js';

class PostList extends React.Component {

    componentDidUpdate(prevProps) {
      const { searchBoxText } = this.props;

      if (searchBoxText !== prevProps.searchBoxText) {
        if (searchBoxText) {
          this.fetchPosts(searchBoxText);
        } else {
          this.props.loadPosts([]);
        }
      }
    }

    fetchPosts(searchWord) {
      this.props.setPostsLoading();
      getPosts(searchWord).then((posts) => {
        this.props.loadPosts(this.props.searchBoxText ? posts : []);
      })
      .catch(() => {
        this.props.loadPosts([]);
      });
    }

    selectPost = (post) => {
      this.props.selectPost(post);
    }

    render() {
      const { isLoading, posts, searchBoxText } = this.props;

      return (
        <div className="post-list">
          <h1 className="title">Posts</h1>
          <div className="list-content">
            {
              !isLoading && !!posts.length &&
              posts.map((post, index) => (
                <PostCard post={post} key={index} onCardClick={this.selectPost}/>
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
        </div>
      );
    }

}

const mapStateToProps = ({ postList, searchBox }) => ({
  posts: postList.posts,
  isLoading: postList.isLoading,
  searchBoxText: searchBox.text
});

const mapDispatchToProps = dispatch => ({
  loadPosts: posts => dispatch(loadPosts(posts)),
  setPostsLoading: posts => dispatch(setPostsLoading(posts)),
  selectPost: post => dispatch(selectPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);