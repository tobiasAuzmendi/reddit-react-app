import React from 'react';
import { connect } from 'react-redux';
import { selectPost } from '../../redux/actions/postDetail';
import './postDetail.scss';
import PostCreationInformation from '../shared/postCreationInformation/PostCreationInformation';
import InformativeMessage from '../shared/informativeMessage/InformativeMessage.js';

class PostDetail extends React.PureComponent {

  componentWillUnmount() {
    this.props.selectPost(null);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-detail">
        <h1 className="title">Selected post</h1>
        {
          !post && <InformativeMessage text="Select a post to see its information. You can find new posts from the header search bar."/>
        }
        {
          post && (
            <div className="post-content">
              <PostCreationInformation post={post}/>
              <div className="post-name">{post.title}</div>
              <div className="image-container">
                <img alt="avatar" src={post.thumbnail || require('../../assets/images/shared/image-not-found.png')} className="card-image" />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ postDetail }) => ({
  post: postDetail.selectedPost
});

const mapDispatchToProps = dispatch => ({
  selectPost: post => dispatch(selectPost(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);