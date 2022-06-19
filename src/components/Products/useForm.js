import { useState } from "react";

export const useForm = (
  initiaValue,
  validateOnChange = false,
  validateProperty
) => {
  const [values, setValues] = useState(initiaValue);
  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    const data = { ...values };
    const { name, value } = target;
    data[name] = value;
    setValues(data);
    if (validateOnChange) {
      const error = { ...errors };
      const errorMessage = validateProperty(name, value);
      if (errorMessage) error[name] = errorMessage;
      else delete error[name];
      setErrors(error);
    }
  };

  const resetForm = () => {
    setValues(initiaValue);
    setErrors({});
  };

  return { values, setValues, handleInputChange, errors, setErrors };
};
