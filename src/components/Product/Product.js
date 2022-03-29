import React, { Component } from "react";
import './Product.css';

class Product extends Component {
  render() {
    const { product, currency: label } = this.props;
    const { gallery, name, prices, inStock } = product;
    const { amount, currency } = prices.filter(record => record.currency.label === label)[0];
    const { symbol } = currency;
    let divOutOfStock = '';
    let imgOutOfStock = '';
    let divProductCart = <div className="product-cart"></div>
    if (inStock === false) {
      divOutOfStock = <div className="out-of-stock">
        OUT OF STOCK
      </div>;
      imgOutOfStock = "image-out-of-stock";
      divProductCart = '';
    }
    return (
      <div className="product-container">
        <div className={"image-container " + imgOutOfStock}>
          <img src={gallery[0]} alt={name} />
        </div>
        {divOutOfStock}
        {divProductCart}
        <div className={"product-title " + imgOutOfStock}>
          {name}
        </div>
        <div className={"product-price " + imgOutOfStock}>
          <strong>{symbol + amount}</strong>
        </div>
      </div>
    );
  }
};

export default Product;
