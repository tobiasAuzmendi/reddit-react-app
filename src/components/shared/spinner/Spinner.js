import React from 'react';
import './spinner.scss';

const Spinner = () => (
  <div className="spinner">
    <i className="spinner-icon fa fa-spinner fa-spin" />
  </div>
);

export default React.memo(Spinner);