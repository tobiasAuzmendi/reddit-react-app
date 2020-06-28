import React from 'react';
import './informativeMessage.scss';

const InformativeMessage = (props) => (
  <div className="informative-message">
    <div className="informative-message-content">
      { props.text }
    </div>
  </div>
);

export default InformativeMessage;