import React from 'react';
import './error-indicator.css';

const ErrorIndicator = ({ error }) => {

  return (
      <div>Error! {error.message} </div>
  )
};

export default ErrorIndicator;
