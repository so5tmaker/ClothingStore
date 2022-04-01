import React, { Component } from "react";
import Grid from '../Grid/Grid.tsx';
import Product from './Product';
import MiniCart from '../MiniCart/MiniCart';
import products from './Products.ts';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
      category: 'all',
      currencyIsVisible: false,
      miniCartIsVisible: false,
      currency: 'USD',
      symbol: '$',
      divOrientation: { top: 0, left: 0 },
      cart: [],
      innerContaner: ''
    };
    this.linkClick = this.linkClick.bind(this);
    this.currencyClick = this.currencyClick.bind(this);
    this.commonClick = this.commonClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  linkClick(category, e) {
    e.preventDefault();
    let filter = products;
    if (category !== 'all') {
      filter = products.filter(product => category === product.category);
    }
    this.setState({
      products: filter,
      category: category,
    });
  }

  isSelected(category) {
    if (category === this.state.category) {
      return 'selected';
    }
    return '';
  }

  currencyClick(e) {
    this.setState({
      currency: e.target.innerText.slice(2),
      symbol: e.target.innerText.substring(0, 1)
    });
  }

  commonClick(e) {
    let parent = document.querySelector('.mini-cart-container');
    let doNotCloseMiniCart = false;
    if (parent !== null) {
      doNotCloseMiniCart = parent.contains(e.target);
    }
    if (!doNotCloseMiniCart) {
      const miniCartIsVisible = (e.target.className === "cart" ||
        e.target.className === "round") && this.state.cart.length !== 0;
      const innerContaner = miniCartIsVisible ? 'inner-container' : '';
      this.setState({
        currencyIsVisible: e.target.className === "vector",
        miniCartIsVisible: miniCartIsVisible,
        innerContaner: innerContaner,
        divOrientation: { top: e.clientY, left: e.clientX }
      });
    }
  }

  addToCart(id) {
    const miniCartArray = this.state.cart;
    let indexProduct = miniCartArray.findIndex(aId => aId.product.id === id)
    if (indexProduct === -1) {
      let product = this.state.products.find(product => product.id === id)
      const { prices } = product;
      const { amount, currency: { symbol } } = prices.filter(record => record.currency.label === this.state.currency)[0];
      this.state.cart.push({ product: product, quantity: 1, amount, symbol });
    } else {
      miniCartArray[indexProduct].quantity = miniCartArray[indexProduct].quantity + 1;
      this.setState({
        cart: miniCartArray
      });
    }
  }

  render() {
    const ProductList = this.state.products.map((product) => (
      <Grid key={product.id} column={true} lg={4}>
        <Product product={product} currency={this.state.currency} onChangeQuantity={this.addToCart} />
      </Grid>
    ));
    const currencyArray = ['$ USD', '€ EUR', '¥ JPY'].map(currency => (
      <div className="currency-item" key={currency} onClick={(e) => this.currencyClick(e)}>{currency}</div>
    ));
    let currencyList = '';
    const { top, left } = this.state.divOrientation;
    if (this.state.currencyIsVisible) {
      currencyList =
        <div className="currency-list"
          style={{ top: top + 15, left: left - 20 }}>
          {currencyArray}
        </div>
    }
    let quantityRound = '';
    if (this.state.cart.length !== 0) {
      quantityRound = <li className="round">{this.state.cart.length}</li>
    }

    return (
      <div className='container' onClick={(e) => this.commonClick(e)}>
        <div className='navbar'>
          <li onClick={e => this.linkClick('all', e)} className={this.isSelected('all')}>All</li>
          <li onClick={e => this.linkClick('tech', e)} className={this.isSelected('tech')}>Tech</li>
          <li onClick={e => this.linkClick('clothes', e)} className={this.isSelected('clothes')}>Clothes</li>
          <li></li>
          <li className="image"></li>
          <li className="symbol">{this.state.symbol}</li>
          <li className="vector"></li>
          <li className="cart"></li>
          {quantityRound}
        </div>
        <div className={'product-content ' + this.state.innerContaner}>
          <h2>{this.state.category.substring(0, 1).toUpperCase()}{this.state.category.slice(1)}</h2>
          <div className='product-items'>
            {ProductList}
          </div>
          {currencyList}
        </div>
        <MiniCart
          state={this.state}
          miniCartOnClick={this.commonClick}
          onChangeQuantity={this.addToCart}
        />
      </div>
    );
  }
};

export default Products;

// GraphQL query for Products
// {
//     product(id:'apple-imac-2021') {
//          name
//       prices{
//         currency {
//           label
//           symbol
//         }
//         amount
//       }
//       description
//       attributes{
//         id
//         items{
//           displayValue
//         }
//       }
//       gallery
//     }
//   }
