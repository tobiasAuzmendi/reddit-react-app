import React from 'react';
import './postCard.scss';
import PostCreationInformation from '../../shared/postCreationInformation/PostCreationInformation';
import { faTimes, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from '../../shared/Image/Image';

class PostCard extends React.PureComponent {

  render() {
    const { post, onCardClick, onDismissClick } = this.props;

    return (
      <div className="post-card" onClick={() => { onCardClick(post) }}>
        <div className="card-container">
          <div className="card-left-content">
            <PostCreationInformation post={post}/>
            <div className="post-name">{post.title}</div>
            {
              <div className="number-of-comments">
                { post.numberOfComments !== undefined ? `${post.numberOfComments} comments` : 'No comments information' }
              </div>
            }
            {
              post.readed && <div className="post-readed"><FontAwesomeIcon className="icon" icon={faBookReader} /></div>
            }
            {
              <div>
                <button className="dismiss-button reddit-app-primary-button icon-text-button" onClick={(ev) => { ev.stopPropagation(); onDismissClick(post.id) }}>
                  <FontAwesomeIcon className="icon" icon={faTimes} />Dismiss
                </button>
              </div>
            }
          </div>
          <div className="card-right-content">
            <Image src={post.thumbnail} />
          </div>
        </div>
      </div>
    );
  }

}

export default PostCard;