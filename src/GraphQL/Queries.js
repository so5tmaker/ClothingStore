import { gql } from '@apollo/client';

export const LOAD_PRODUCTS = gql`
  query {
  categories {
    name
    products {
      id
      name
      inStock
      brand
      description
      category
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        items {
          displayValue
          value
        }
      }
      gallery
    }
  }
  currencies {
    label
    symbol
  }
}`;

export const LOAD_ATTRIBUTES = gql`
  query($id: String!){
  product(id:$id){
    attributes{
      id 
      items{
        displayValue
          value
      }
    }
  }
}`;