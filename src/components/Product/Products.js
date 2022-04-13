import React, { Component } from "react";
import Product from './Product';
import MiniCart from '../MiniCart/MiniCart';
import Cart from "../Cart/Cart";
import Details from "../Details/Details";
import { client } from '../../index';
import { LOAD_PRODUCTS, LOAD_ATTRIBUTES } from '../../GraphQL/Queries';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: 'all',
      currencyIsVisible: false,
      miniCartIsVisible: false,
      cartIsVisible: false,
      detailsIsVisible: false,
      currency: 'USD',
      symbol: '$',
      divOrientation: { top: 0, left: 0 },
      cart: [],
      innerContainer: '',
      productId: '',
      categories: [],
      currencies: [],
      attributes: [],
      dbAttributes: [],
      image: ''
    };
    this.linkClick = this.linkClick.bind(this);
    this.currencyClick = this.currencyClick.bind(this);
    this.commonClick = this.commonClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    this.cartVeiwClick = this.cartVeiwClick.bind(this);
    this.onOpenDetails = this.onOpenDetails.bind(this);
    this.setSelectedAttributes = this.setSelectedAttributes.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.getAttributes = this.getAttributes.bind(this);
  }

  onChangeImage(e) {
    this.setState({ image: e.target.src });
  }

  componentDidMount = async () => {
    if (this.state.categories.length === 0) {
      const response = await client.query({
        query: LOAD_PRODUCTS
      })
      const { categories, currencies } = response.data;
      this.setState({
        categories,
        currencies,
        products: categories[0].products
      })
    }
    const localStorageCart = localStorage.getItem('cart');
    const localStorageCurrency = localStorage.getItem('currency');
    if (localStorageCart) {
      this.setState({
        cart: JSON.parse(localStorageCart)
      });
    }
    if (localStorageCurrency) {
      const { currency, symbol } = JSON.parse(localStorageCurrency);
      this.setState({
        currency,
        symbol
      });
    }
  }

  componentDidUpdate() {
    if (this.state.cart.length !== 0) {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }
    if (this.state.symbol !== '$') {
      localStorage.setItem('currency', JSON.stringify({ currency: this.state.currency, symbol: this.state.symbol }));
    }
  }

  changeAttributes(attributes = []) {
    this.setState({
      attributes
    });
  }

  linkClick(category, e) {
    e.stopPropagation();
    const { products } = this.state.categories.filter(item => item.name === category)[0];
    this.setState({
      products,
      category,
      detailsIsVisible: false,
      attributes: [],
      image: ''
    });
  }

  isSelected(category) {
    if (category === this.state.category) {
      return 'selected';
    }
    return '';
  }

  currencyClick(e) {
    const stateSymbol = this.state.symbol;
    const currencyArray = e.target.innerText.split(' ');
    const targetSymbol = currencyArray[1];
    this.setState({
      currency: currencyArray[0],
      symbol: targetSymbol
    });
    if (stateSymbol !== targetSymbol) {
      const { cart, products } = this.state;
      for (let item of cart) {
        const product = products.filter(record => record.id === item.product.id)[0];
        if (product !== undefined) {
          const { amount, currency: { symbol } } = product.prices.filter(record => record.currency.symbol === targetSymbol)[0];
          item.amount = amount;
          item.symbol = symbol;
        }
      }
      this.setState({
        cart: cart
      });
    }
  }

  getModalVisibility(e, selector) {
    let parent = document.querySelector(selector);
    if (parent !== null) {
      return parent.contains(e.target);
    }
    return false;
  }

  commonClick(e) {
    const className = e.target.className;
    const doNotCloseMiniCart = this.getModalVisibility(e, '.mini-cart-container');
    const doNotCloseCart = this.getModalVisibility(e, '.cart-container');
    let cartIsVisible = className === 'open-cart';
    if (this.state.cartIsVisible && (className === 'vector' || className === 'currency-item')) {
      cartIsVisible = true;
    }
    if (!doNotCloseMiniCart && !doNotCloseCart) {
      const miniCartIsVisible = (className === "cart" ||
        className === "round") && this.state.cart.length !== 0;
      const innerContainer = miniCartIsVisible ? 'inner-container' : '';
      this.setState({
        currencyIsVisible: className === "vector",
        miniCartIsVisible: miniCartIsVisible,
        cartIsVisible: cartIsVisible,
        innerContainer: innerContainer,
        divOrientation: { top: e.clientY, left: e.clientX }
      });
    }
  }

  async getAttributes(productId) {
    const response = await client.query({
      query: LOAD_ATTRIBUTES,
      variables: { id: productId }
    });
    const { product: { attributes } } = response.data;
    return attributes;
  }

  onOpenDetails(e, productId) {
    const className = e.target.className;
    if (this.state.attributes.length === 0) {
      this.getAttributes(productId)
        .then((attributes) => {
          if (className !== 'button-cart') {
            this.setState({
              detailsIsVisible: true,
              productId,
              dbAttributes: attributes
            });
          }
        });
    }
  }

  cartVeiwClick(e) {
    e.stopPropagation();
    this.setState({
      miniCartIsVisible: false,
      cartIsVisible: true,
      detailsIsVisible: false,
      image: ''
    });
  }

  setSelectedAttributes(attributes) {
    return (attributes.map(item => {
      let firstIteration = true;
      const items = item.items.map(item => {
        const items = { displayValue: item.displayValue, value: item.value, selected: firstIteration };
        firstIteration = false;
        return (items);
      });
      return (
        {
          id: item.id,
          items: items
        });
    }));
  }

  addToCart(id, sign = 1, attributes = []) {
    const miniCartArray = this.state.cart;
    let indexProduct = miniCartArray.findIndex(aId => aId.product.id === id)
    if (indexProduct === -1) {
      let product = this.state.products.find(product => product.id === id)
      const { prices } = product;
      const { amount, currency: { symbol } } = prices.filter(record => record.currency.label === this.state.currency)[0];
      let productAttributes = this.setSelectedAttributes(product.attributes);
      if (attributes.length !== 0) {
        productAttributes = attributes;
      }
      this.state.cart.push({ product: product, quantity: sign, amount, symbol, attributes: productAttributes });
    } else {
      const product = miniCartArray[indexProduct]
      const quantity = product.quantity + sign;
      if (attributes.length !== 0) {
        product.attributes = attributes;
      }
      product.quantity = quantity;
      if (quantity === 0) {
        miniCartArray.splice(indexProduct, 1);
      }
      this.setState({
        cart: miniCartArray
      });
    }
  }

  onChangeAttribute(productId, attributeId, displayValue) {
    const miniCartArray = this.state.cart;
    const indexProduct = miniCartArray.findIndex(aId => aId.product.id === productId);
    if (indexProduct !== -1) {
      miniCartArray[indexProduct].attributes = miniCartArray[indexProduct].attributes.map(attribute => {
        const items = attribute.items.map(item => {
          let selected = item.selected;
          if (attributeId === attribute.id) {
            selected = item.displayValue === displayValue;
          }
          return ({ displayValue: item.displayValue, value: item.value, selected: selected });
        });
        return (
          {
            id: attribute.id,
            items: items
          });
      });
      this.setState({
        cart: miniCartArray
      });
    }
  }

  render() {
    const {
      category,
      innerContainer,
      currencyIsVisible,
      cartIsVisible,
      detailsIsVisible,
      products,
      currency,
      symbol,
      cart,
      currencies,
      divOrientation: { top, left }
    } = this.state;
    const ProductList = products.map((product) => (
      <Product
        key={product.id}
        product={product}
        currency={currency}
        innerContainer={innerContainer}
        onChangeQuantity={this.addToCart}
        onOpenDetails={this.onOpenDetails}
      />
    ));
    const currencyArray = currencies.map(currency => {
      const name = currency.label + ' ' + currency.symbol;
      return (
        <div
          key={name}
          className="currency-item"
          onClick={(e) => this.currencyClick(e)}
        >
          {name}
        </div >);
    });
    let currencyList = '';
    if (currencyIsVisible) {
      currencyList =
        <div className="currency-list"
          style={{ top: top + 15, left: left - 20 }}>
          {currencyArray}
        </div>
    }
    let quantityRound = '';
    if (cart.length !== 0) {
      quantityRound = <li key={'round'} className="round">{cart.length}</li>
    }
    let wrapperBackground = '';
    if (innerContainer !== '' && !detailsIsVisible && !cartIsVisible) {
      wrapperBackground = ' wrapper-background';
    }

    return (
      <div className={'wrapper' + wrapperBackground} onClick={(e) => this.commonClick(e)}>
        <div className='container'>
          <div className='navbar'>
            <li onClick={e => this.linkClick('all', e)} className={this.isSelected('all')}>All</li>
            <li onClick={e => this.linkClick('tech', e)} className={this.isSelected('tech')}>Tech</li>
            <li onClick={e => this.linkClick('clothes', e)} className={this.isSelected('clothes')}>Clothes</li>
            <li ></li>
            <li className="image"></li>
            <li className="symbol">{symbol}</li>
            <li className="vector"></li>
            <li className="cart"></li>
            {quantityRound}
          </div>
          {
            (!cartIsVisible && !detailsIsVisible) &&
            (<div className={'product-content ' + innerContainer}>
              <h2>{`${category.substring(0, 1).toUpperCase() + category.slice(1)}`}</h2>
              <div className='product-items'>
                {ProductList}
              </div>
            </div>)
          }
          <Cart
            state={this.state}
            onChangeQuantity={this.addToCart}
            onChangeAttribute={this.onChangeAttribute}
          />
          <Details
            key={'detail'}
            state={this.state}
            onChangeQuantity={this.addToCart}
            onChangeAttribute={this.onChangeAttribute}
            setSelectedAttributes={this.setSelectedAttributes}
            changeAttributes={this.changeAttributes}
            onChangeImage={this.onChangeImage}
          />
          <MiniCart
            state={this.state}
            cartVeiwClick={this.cartVeiwClick}
            onChangeQuantity={this.addToCart}
            onChangeAttribute={this.onChangeAttribute}
          />
          {currencyList}
        </div>
      </div>
    );
  }
};

export default Products;
