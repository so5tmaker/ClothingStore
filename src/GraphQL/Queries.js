import { gql } from '@apollo/client';

export const LOAD_ALL = gql`
query($CategoryInput: CategoryInput){
  categories {
    name
  }
  category(input:$CategoryInput){
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
    id
    attributes{
      id 
      items{
        displayValue
        value
      }
    }
  }
}`;

export const LOAD_PRODUCT = gql`
query($id: String!) {
  product(id:$id) {
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
}`;

export const LOAD_CATEGORY = gql`
query($CategoryInput: CategoryInput){
  category(input: $CategoryInput){
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
}`;