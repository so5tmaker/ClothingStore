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
      currency: '$ USD'
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

  currencyClick(currency) {
    this.setState({
      currency: currency,
      currencyIsVisible: true
    });
  }

  render() {
    const ProductList = this.state.products.map((product) => (
      <Grid key={product.id} column={true} lg={4}>
        <Product product={product} />
      </Grid>
    ));
    const currencyArray = ['$ USD', '€ EUR', '¥ JPY'].map(currency => (
      <div className="currency-item">{currency}</div>
    ));
    let currencyList = '';
    if (this.state.currency === true) {
      currencyList = <div className="currency-list">{currencyArray}</div>
    }

    return (
      <div className='container'>
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
                <li className="cart">$ ∨</li>
                <li className="cart"></li>
                <li className="round">2</li>
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
