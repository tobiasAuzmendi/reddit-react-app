import React from 'react';
import './postCard.scss';

class PostCard extends React.PureComponent {

  render() {
    const { post, onCardClick } = this.props;
    post.readed = true;
    return (
      <div className="post-card" onClick={() => { onCardClick(post) }}>
        <div className="card-container">
          <div className="card-left-content">
            <div className="post-author">Posted by <span className="author-name">{post.author}</span> {post.passedTime}</div>
            <div className="post-name">{post.title}</div>
            {
              post.readed && <div className="post-readed">Readed</div>
            }
          </div>
          <div className="card-right-content"><img alt="avatar" src={post.thumbnail || require('../../../assets/images/shared/image-not-found.png')} className="card-image" /></div>
        </div>
      </div>
    );
  }

}

export default PostCard;