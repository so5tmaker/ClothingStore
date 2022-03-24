import React, { Component } from "react";
import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    const { gallery, name, prices } = product;
    const { amount, currency } = prices[0];
    const { symbol } = currency;
  }
  render() {
    const { product } = this.props;
    const { gallery, name, prices } = product;
    const { amount, currency } = prices[0];
    const { symbol } = currency;
    return (
      <div className="card-container">
        <div className="image-container">
          <img src={gallery[0]} alt={name} />
        </div>
        <div className="card-title">
          {name}
        </div>
        <div className="card-price">
          <strong>{symbol + '' + amount}</strong>
        </div>
      </div>
    );
  }
};

export default Product;
