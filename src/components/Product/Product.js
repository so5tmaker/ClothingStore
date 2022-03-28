import React, { Component } from "react";
import './Product.css';

class Product extends Component {
  render() {
    const { product } = this.props;
    const { gallery, name, prices } = product;
    const { amount, currency } = prices[0];
    const { symbol } = currency;
    return (
      <div className="product-container">
        <div className="image-container">
          <img src={gallery[0]} alt={name} />
        </div>
        <div className="product-cart">
        </div>
        <div className="product-title">
          {name}
        </div>
        <div className="product-price">
          <strong>{symbol + '' + amount}</strong>
        </div>
      </div>
    );
  }
};

export default Product;
