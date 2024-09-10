import { useState } from 'react';

function useFormFields<T extends Record<string, any>>(initialState: T) {
  const [fields, setFields] = useState(initialState);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);
    setFields({
      ...fields,
      [name]: value
    });
  };

  const reset = () => {
    setFields(initialState);
  };

  return {
    fields,
    handleFieldChange,
    reset
  };
}

export default useFormFields;
