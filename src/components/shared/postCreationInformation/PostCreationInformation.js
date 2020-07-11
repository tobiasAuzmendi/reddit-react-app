import React from 'react';
import './postCreationInformation.scss';

const PostCreationInformation = ({ post }) => (
  <div className="post-creation-information">Posted by <span className="author-name">{post.author}</span> {post.passedTime}</div>
);

export default React.memo(PostCreationInformation);