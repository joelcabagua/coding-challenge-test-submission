import React, { FunctionComponent } from 'react';

import Button from '../Button/Button';
import InputText, { InputTextProps } from '../InputText/InputText';
import $ from './Form.module.css';

interface FormEntry extends InputTextProps {
  extraProps?: any;
}

interface FormProps {
  label: string;
  loading: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  submitText: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText,
  handleChange
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps, ...rest }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              key={`${name}-${index}`}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              {...extraProps}
              {...rest}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
