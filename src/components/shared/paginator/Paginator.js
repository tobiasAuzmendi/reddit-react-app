import React from 'react';
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './paginator.scss';

const Paginator = ({ page, onPrevPageClick, onNextPageClick, disableNext }) => (
  <div className="paginator">
    <button onClick={() => { onPrevPageClick() }} disabled={ page < 2 }><FontAwesomeIcon className="icon" icon={faArrowCircleLeft} /></button>
    <div className="page-number"> { page } </div>
    <button onClick={() => { onNextPageClick() }} disabled={ disableNext }><FontAwesomeIcon className="icon" icon={faArrowCircleRight} /></button>
  </div>
);

export default Paginator;