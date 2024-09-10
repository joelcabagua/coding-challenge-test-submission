import React, { FunctionComponent } from 'react';
import Button from '../Button/Button';

import $ from './ClearButton.module.css';

interface Props {
  clearFields: () => void;
}

const ClearButton: FunctionComponent<Props> = ({ clearFields }) => {
  return (
    <Button type="reset" onClick={clearFields} variant="secondary">
      Clear
    </Button>
  );
};

export default ClearButton;
