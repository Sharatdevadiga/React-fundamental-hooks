import { useState } from "react";

const useForm = (initialValues, validations, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validate = validations[name];
    if (validate) {
      const { isValid, errorMessage } = validate(value, values);
      if (!isValid) setErrors({ ...errors, [name]: errorMessage });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    for (const [name, validate] of Object.entries(validations)) {
      const value = values[name];
      if (validate) {
        const { isValid, errorMessage } = validate(value, values);
        if (!isValid) newErrors[name] = errorMessage;
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    await onSubmit(values, resetFields);
    setIsSubmitting(false);
  };

  const resetFields = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit,
    resetFields,
  };
};

export default useForm;
