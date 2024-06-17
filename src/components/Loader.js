import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/mystyle.css'; // Import your CSS file for styling

const Loader = () => (
  <div className="loader-container">
    <FontAwesomeIcon icon={faSpinner} spin size="3x" />
  </div>
);

export default Loader;
