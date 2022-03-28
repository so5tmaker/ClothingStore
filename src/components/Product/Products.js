import React, { Component } from "react";
import Grid from '../Grid/Grid.tsx';
import Product from './Product';
import products from './Products.ts';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: products };
  }
  render() {
    const ProductList = this.state.products.map((product) => (
      <Grid key={product.id} column={true} lg={4}>
        <Product product={product} />
      </Grid>
    ));
    return (
      <div className='container'>
        <div className='navbar'>
        <Grid row={true} justify='flex-start'>
          <Grid column={true} lg={8}>
            <Grid row={true} justify='flex-start'>
              <li>All</li>
              <li className="selected">Tech</li>
              <li>Clothes</li>
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
          <h2>Tech</h2>
        </Grid>
        <Grid row={true} justify='flex-start'>
          {ProductList}
        </Grid>
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
