import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const sendOrdersUrl =
  "https://react-foodorderapp-70dd2-default-rtdb.firebaseio.com/orders.json";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const { isLoading, error, sendRequest: sendOrderDetails } = useHttp();
  const [isCheckout, setIsCheckout] = useState(false);
  const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [isRequestSent, setIsRequestSent] = useState(false);
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cancelButtonHandler = () => {
    setIsCheckout(false);
  };

  const orderSubmitResponseHandler = (response) => {
    console.log(response);
  };

  const orderSubmitHandler = (userData) => {
    const requestConfig = {
      url: sendOrdersUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        id: Math.random().toString(36).substring(7),
        user: userData,
        orderItems: cartCtx.items,
      },
    };

    if (!error && !isLoading && !isRequestSent) {
      setIsRequestSent(true);
      sendOrderDetails(requestConfig, orderSubmitResponseHandler);
      setIsCheckout(false);
      cartCtx.clearCart();
    }
  };

  const cartItems = cartCtx.items.length > 0 && (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            name={cartItem.name}
            amount={cartItem.amount}
            price={cartItem.price}
            onAdd={cartItemAddHandler.bind(null, cartItem)}
            onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
          ></CartItem>
        );
      })}
    </ul>
  );

  const modalCartItems = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={cancelButtonHandler}
          onOrderSubmit={orderSubmitHandler}
        ></Checkout>
      )}
      <div className={classes.actions}>
        {!isCheckout && (
          <button
            className={classes["button--alt"]}
            onClick={props.onHideCartButtonClick}
          >
            Close
          </button>
        )}
        {hasItems && !isCheckout && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const modalRequestSent = <p>Sending Order Data...</p>;
  const modalRequestFailed = <p>{error}</p>;
  const modalRequestSuccess = (
    <React.Fragment>
      <p>Your Order Was Received Successfully!</p>{" "}
      <div className={classes.actions}>
        {!isCheckout && (
          <button
            className={classes["button--alt"]}
            onClick={props.onHideCartButtonClick}
          >
            Close
          </button>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCartButtonClick={props.onHideCartButtonClick}>
      {!isRequestSent && modalCartItems}
      {isRequestSent && isLoading && !error && modalRequestSent}
      {isRequestSent && !isLoading && error && modalRequestFailed}
      {isRequestSent && !isLoading && !error && modalRequestSuccess}
    </Modal>
  );
};

export default Cart;
