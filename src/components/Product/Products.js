import React, { Component } from "react";
import Product from './Product';
import MiniCart from '../MiniCart/MiniCart';
import Cart from "../Cart/Cart";
import Details from "../Details/Details";
import Currency from "../Currencies/Currency";
import { client } from '../../index';
import { LOAD_PRODUCTS, LOAD_ATTRIBUTES, LOAD_PRODUCT } from '../../GraphQL/Queries';

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
    this.addNewItemInCart = this.addNewItemInCart.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);
    this.getItemAtributesId = this.getItemAtributesId.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.onMiniCartClick = this.onMiniCartClick.bind(this);
    this.onCurrencyListClick = this.onCurrencyListClick.bind(this);

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

  linkClick(category) {
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
    const doNotCloseCart = this.getModalVisibility(e, '.cart-container');
    let cartIsVisible = className === 'open-cart';
    if (this.state.cartIsVisible && (className === 'vector' || className === 'currency-item')) {
      cartIsVisible = true;
    }
    if (!doNotCloseCart) {
      const miniCartIsVisible = (className === "cart" ||
        className === "round") && this.state.cart.length !== 0;
      const innerContainer = miniCartIsVisible ? 'inner-container' : '';
      this.setState({
        cartIsVisible: cartIsVisible,
        innerContainer: innerContainer,
        divOrientation: { top: e.clientY, left: e.clientX }
      });
    }
  }

  onMiniCartClick(e) {
    e.stopPropagation();
    const miniCartIsVisible = this.state.cart.length !== 0;
    const innerContainer = miniCartIsVisible ? 'inner-container' : '';
    this.setState({
      currencyIsVisible: false,
      miniCartIsVisible: miniCartIsVisible,
      innerContainer: innerContainer,
      divOrientation: { left: e.clientX }
    });
  }

  onCurrencyListClick(e) {
    e.stopPropagation();
    this.setState({
      currencyIsVisible: true,
      miniCartIsVisible: false,
      divOrientation: { top: e.clientY, left: e.clientX }
    });
  }

  async getAttributes(productId) {
    const response = await client.query({
      query: LOAD_ATTRIBUTES,
      variables: { id: productId }
    });
    const { product: { attributes } } = response.data;
    return attributes;
  }

  async getProduct(productId) {
    const response = await client.query({
      query: LOAD_PRODUCT,
      variables: { id: productId }
    });
    const { product } = response.data;
    return product;
  }

  async onOpenDetails(e, productId) {
    const className = e.target.className;
    let attributes = this.state.attributes;
    if (attributes.length === 0) {
      attributes = await this.getAttributes(productId);
    }
    this.setState({
      productId,
      detailsIsVisible: className !== 'button-cart',
      dbAttributes: attributes
    });
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

  addNewItemInCart(product, attributes, mcId) {
    const { prices } = product;
    const { amount, currency: { symbol } } = prices.filter(record => record.currency.label === this.state.currency)[0];
    const cart = this.state.cart;
    cart.push({ product, mcId, quantity: 1, amount, symbol, attributes });
    this.setState({
      cart
    });
  }

  getSelectedItems(attributes) {
    let attributesArray = [];
    for (const attribute of attributes) {
      const oneItem = attribute.items.filter(item => (item.selected))[0];
      attributesArray.push({ id: attribute.id, value: oneItem.value });
    }
    return attributesArray;
  }

  getItemAtributesId(attributes) {
    let attributeText = '';
    for (const attribute of attributes) {
      const oneItem = attribute.items.filter(item => (item.selected));
      attributeText += '-' + oneItem[0].value;
    }
    return attributeText;
  }

  async addToCart(id, sign = 1, mcId = '') {
    const { cart: miniCartArray, attributes } = this.state;
    const product = await this.getProduct(id);
    let productAttributes = attributes;
    if (attributes.length === 0) {
      productAttributes = this.setSelectedAttributes(product.attributes);;
    }
    if (mcId === '') {
      mcId = id + this.getItemAtributesId(productAttributes);
    }
    const indexProduct = miniCartArray.findIndex(aId => aId.mcId === mcId);
    if (indexProduct === -1) {
      this.addNewItemInCart(product, productAttributes, mcId);
    } else {
      const mcProduct = miniCartArray[indexProduct];
      const quantity = mcProduct.quantity + sign;
      mcProduct.quantity = quantity;
      if (quantity === 0) {
        miniCartArray.splice(indexProduct, 1);
      }
      this.setState({
        cart: miniCartArray
      });
      if (miniCartArray.length === 0) {
        localStorage.setItem('cart', JSON.stringify(miniCartArray));
      }
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
    let quantityRound = '';
    if (cart.length !== 0) {
      quantityRound = <li key={'round'} onClick={this.onMiniCartClick} className="round">{cart.length}</li>
    }
    let wrapperBackground = '';
    if (innerContainer !== '' && !detailsIsVisible && !cartIsVisible) {
      wrapperBackground = ' wrapper-background';
    }

    return (
      <div className={'wrapper' + wrapperBackground} onClick={(e) => this.commonClick(e)}>
        <div className='container'>
          <div className='navbar'>
            <li onClick={e => this.linkClick('all')} className={this.isSelected('all')}>All</li>
            <li onClick={e => this.linkClick('tech')} className={this.isSelected('tech')}>Tech</li>
            <li onClick={e => this.linkClick('clothes')} className={this.isSelected('clothes')}>Clothes</li>
            <li ></li>
            <li className="image"></li>
            <li className="symbol">{symbol}</li>
            <li className="vector" onClick={this.onCurrencyListClick}></li>
            <li className="cart" onClick={this.onMiniCartClick}></li>
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
            getItemAtributesId={this.getItemAtributesId}
          />
          <Currency
            top={top + 15}
            left={left - 20}
            currencies={currencies}
            currencyIsVisible={currencyIsVisible}
            currencyClick={this.currencyClick}
          />
        </div>
      </div>
    );
  }
};

export default Products;
