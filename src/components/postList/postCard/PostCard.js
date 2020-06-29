import React from 'react';
import './postCard.scss';
import PostCreationInformation from '../../shared/postCreationInformation/PostCreationInformation';
import { faTimes, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostCard extends React.PureComponent {

  render() {
    const { post, onCardClick, onDismissClick } = this.props;

    return (
      <div className="post-card" onClick={() => { onCardClick(post) }}>
        <div className="card-container">
          <div className="card-left-content">
            <div>
              <PostCreationInformation post={post}/>
              <div className="post-name">{post.title}</div>
            </div>
            <div>
              {
                post.readed && <div className="post-readed"><FontAwesomeIcon className="icon" icon={faBookReader} /></div>
              }
              {
                <button className="dismiss-button" onClick={() => { onDismissClick(post.id) }}><FontAwesomeIcon className="icon" icon={faTimes} />Dismiss</button>
              }
            </div>
          </div>
          <div className="card-right-content"><img alt="avatar" src={post.thumbnail || require('../../../assets/images/shared/image-not-found.png')} className="card-image" /></div>
        </div>
      </div>
    );
  }

}

export default PostCard;