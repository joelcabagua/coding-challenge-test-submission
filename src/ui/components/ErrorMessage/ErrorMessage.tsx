import React, { FunctionComponent } from 'react';

import $ from './ErrorMessage.module.css';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ error }) => {
  return <p className={$.errorMessage}>{error}</p>;
};

export default ErrorMessage;
