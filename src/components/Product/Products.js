import React, { Component } from "react";
import Grid from '../Grid/Grid.tsx';
import Product from './Product';
import products from './Products.ts';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
      category: 'all',
      currencyIsVisible: false,
      currency: 'USD',
      symbol: '$',
      cart: []
    };
    this.linkClick = this.linkClick.bind(this);
    this.currencyClick = this.currencyClick.bind(this);
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
    this.setState({
      currencyIsVisible: e.target.className === 'symbol'
    });
  }

  render() {
    const ProductList = this.state.products.map((product) => (
      <Grid key={product.id} column={true} lg={4}>
        <Product product={product} currency={this.state.currency} />
      </Grid>
    ));
    const currencyArray = ['$ USD', '€ EUR', '¥ JPY'].map(currency => (
      <div className="currency-item" onClick={(e) => this.currencyClick(e)}>{currency}</div>
    ));
    let currencyList = '';
    if (this.state.currencyIsVisible) {
      currencyList = <div className="currency-list">{currencyArray}</div>
    }
    let quantityRound = '';
    if (this.state.cart.length !== 0) {
      quantityRound = <li className="round">{this.this.state.cart.length}</li>
    }

    return (
      <div className='container' onClick={(e) => this.commonClick(e)}>
        <div className='navbar'>
          <Grid row={true} justify='flex-start'>
            <Grid column={true} lg={8}>
              <Grid row={true} justify='flex-start'>
                <li onClick={e => this.linkClick('all', e)} className={this.isSelected('all')}>All</li>
                <li onClick={e => this.linkClick('tech', e)} className={this.isSelected('tech')}>Tech</li>
                <li onClick={e => this.linkClick('clothes', e)} className={this.isSelected('clothes')}>Clothes</li>
              </Grid>
            </Grid>
            <Grid column={true} lg={2}>
              <Grid row={true} justify='flex-start'>
                <li className="image"></li>
              </Grid>
            </Grid>
            <Grid column={true} lg={2}>
              <Grid row={true} justify='center'>
                <li className="symbol">{this.state.symbol} ∨</li>
                <li className="cart"></li>
                {quantityRound}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid row={true} justify='flex-start'>
          <h2>{this.state.category.substring(0, 1).toUpperCase()}{this.state.category.slice(1)}</h2>
        </Grid>
        <Grid row={true} justify='flex-start'>
          {ProductList}
        </Grid>
        {currencyList}
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
