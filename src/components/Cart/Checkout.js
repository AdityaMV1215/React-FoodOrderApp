import classes from "./Checkout.module.css";
import { useEffect, useState } from "react";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    value: nameInputValue,
    valueIsValid: nameInputValueIsValid,
    hasError: nameInputValueHasError,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((name) => name.trim() !== "");

  const {
    value: streetInputValue,
    valueIsValid: streetInputValueIsValid,
    hasError: streetInputValueHasError,
    inputChangeHandler: streetInputChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: streetInputReset,
  } = useInput((street) => street.trim() !== "");

  const {
    value: postalInputValue,
    valueIsValid: postalInputValueIsValid,
    hasError: postalInputValueHasError,
    inputChangeHandler: postalInputChangeHandler,
    inputBlurHandler: postalInputBlurHandler,
    reset: postalInputReset,
  } = useInput((postal) => postal.trim().length === 5);

  const {
    value: cityInputValue,
    valueIsValid: cityInputValueIsValid,
    hasError: cityInputValueHasError,
    inputChangeHandler: cityInputChangeHandler,
    inputBlurHandler: cityInputBlurHandler,
    reset: cityInputReset,
  } = useInput((city) => city.trim() !== "");

  useEffect(() => {
    if (
      nameInputValueIsValid &&
      streetInputValueIsValid &&
      postalInputValueIsValid &&
      cityInputValueIsValid
    ) {
      setIsFormValid(true);
    } else{
        setIsFormValid(false);
    }
  }, [
    nameInputValueIsValid,
    streetInputValueIsValid,
    postalInputValueIsValid,
    cityInputValueIsValid,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onOrderSubmit({
        name: nameInputValue,
        street: streetInputValue,
        postalCode: postalInputValue,
        city: cityInputValue
    });
    nameInputReset();
    streetInputReset();
    postalInputReset();
    cityInputReset();
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={`${classes.control} ${nameInputValueHasError ? classes.invalid : ''}`}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          value={nameInputValue}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      <div className={`${classes.control} ${streetInputValueHasError ? classes.invalid : ''}`}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={streetInputValue}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
      </div>
      <div className={`${classes.control} ${postalInputValueHasError ? classes.invalid : ''}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          type="text"
          value={postalInputValue}
          onChange={postalInputChangeHandler}
          onBlur={postalInputBlurHandler}
        />
      </div>
      <div className={`${classes.control} ${cityInputValueHasError ? classes.invalid : ''}`}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={cityInputValue}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
