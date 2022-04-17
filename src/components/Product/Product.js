import React, { Component } from "react";
import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
  }

  onChangeQuantity(e) {
    this.props.onChangeQuantity(e.target.title, 1);
  }

  render() {
    const { product, currency: label, innerContainer } = this.props;
    const { gallery, name, prices, inStock, id } = product;
    const price = prices.filter(record => record.currency.label === label)[0];
    const { amount, currency: { symbol } } = price;
    let divOutOfStock = '';
    let imgOutOfStock = '';
    let divButtonCart = <div className="button-cart" title={id} onClick={(e) => this.onChangeQuantity(e)}></div>
    if (inStock === false) {
      divOutOfStock = <div className="out-of-stock">
        OUT OF STOCK
      </div>;
      imgOutOfStock = " image-out-of-stock";
      divButtonCart = '';
    }
    let opacity = '';
    if (innerContainer !== '') {
      opacity = ' image-opacity';
    }
    return (
      <div className="product-container" onClick={(e) => (this.props.onOpenDetails(e, id))}>
        <div className={"image-container" + imgOutOfStock + opacity}>
          <img src={gallery[0]} alt={name} />
        </div>
        {divOutOfStock}
        {divButtonCart}
        <div className={"product-title " + imgOutOfStock}>
          {name}
        </div>
        <div className={"product-price " + imgOutOfStock}>
          {symbol + amount}
        </div>
      </div>
    );
  }
};

export default Product;
