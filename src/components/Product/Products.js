import React, { Component } from "react";
import Grid from "../Grid/Grid.tsx";
import Product from './Product';
import products from "./Products.ts";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { products: products };
  }
  render() {
    const ProductList = this.state.products.map((product) => (
      <Grid item key={product.id} column={true} xs={12} sm={6} md={4} lg={3}>
        <Product product={product} />
      </Grid>
    ));
    return (
      <Grid row={true}>
        {ProductList}
      </Grid>
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
