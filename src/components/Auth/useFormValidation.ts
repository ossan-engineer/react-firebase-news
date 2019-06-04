import { useState, useEffect } from "react";
import { Values } from "./auth";
import { bool } from "prop-types";

function useFormValidation(
  initialState: Values,
  validate: (values: Values) => void,
  authenticateUser: () => void
) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticateUser();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(e: any) {
    e.persist();
    setValues((prevValues: any) => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
}

export default useFormValidation;
