import React from 'react';
import { connect } from 'react-redux';
import { selectPost } from '../../redux/actions/postDetail';

class PostDetail extends React.PureComponent {

  componentWillUnmount() {
    this.props.selectPost(null);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-detail-container">
        { post && post.title }
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