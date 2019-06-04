import { useState } from "react";
import { State } from "./auth";

function useFormValidation(initialState: State) {
  const [values, setValues] = useState(initialState);

  function handleChange(e: any) {
    e.persist();
    setValues((prevValues: any) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log({ values });
  }

  return { handleChange, handleSubmit, values };
}

export default useFormValidation;
