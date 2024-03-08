import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import style from "./style.module.css"
import { CartState } from "../context/ProductContext";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);

  return (
    <div className={style.products}>
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>${product.price.split(".")[0]}</span>
            {product.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 Days Delivery</div>
            )}
            {/* <Rating rating={product.ratings} /> */}
          </Card.Subtitle>

          {cart.some((p) => p.id === product.id) ? (
            <Button
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
              }}
              variant="danger"
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: product });
              }}
              disabled={!product.fastDelivery}
            >
              {!product.fastDelivery ? "out of stock" : "add to cart"}
            </Button>
          )}

          {/* <Button disabled={!product.inStock} {!product.inStock ? "out of stock" : "add to cart"}</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
