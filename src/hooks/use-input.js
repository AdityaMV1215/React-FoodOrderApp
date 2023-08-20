import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateInput(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  function inputChangeHandler(event) {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  }

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    valueIsValid: enteredValueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
