import React from "react";
import { CartState } from "../context/ProductContext";
import SingleProduct from "./SingleProduct";
import Filters from "./Filters";
import style from "./style.module.css";

const Home = () => {
  // const { state } = CartState();
  // console.log(state);

  const {
    state: { products },
    //if we want to destructure further to the products we can do like that.
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
  } = CartState();

  // console.log(products);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // if (!byStock) {
    //   sortedProducts = sortedProducts.filter((product) => product.inStock);
    // }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter(
        (product) => product.byFastDelivery
      );
    }

    // if (byRating) {
    //   sortedProducts = sortedProducts.filter(
    //     (product) => product.byRating >= byRating
    //   );
    // }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className={style.home}>
      <Filters />
      <div className={style.productcontainer}>
        {transformProducts().map((product) => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
