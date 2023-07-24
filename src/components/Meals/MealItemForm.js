import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitButtonHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitButtonHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{ type: "number", min: "1", max: "5", defaultValue: "1" }}
        id={"amount_" + props.id}
      ></Input>
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please Enter a Valid Amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
