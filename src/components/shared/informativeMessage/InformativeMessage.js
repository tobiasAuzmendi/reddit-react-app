import React from 'react';
import './informativeMessage.scss';

const InformativeMessage = ({ text }) => (
  <div className="informative-message">
    <div className="informative-message-content">
      { text }
    </div>
  </div>
);

export default React.memo(InformativeMessage);