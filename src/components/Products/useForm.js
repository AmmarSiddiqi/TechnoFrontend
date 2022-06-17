import { useState } from "react";

export const useForm = (initiaValue) => {
  const [values, setValues] = useState(initiaValue);

  const handleInputChange = (event) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  return { values, setValues, handleInputChange };
};
