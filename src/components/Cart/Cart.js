import React, { Component } from "react";
import Attribute from "../Attributes/Attribute";
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    onChangeQuantity(id, sign = 1) {
        this.props.onChangeQuantity(id, sign);
    }

    render() {
        const { state: { divOrientation: { top, left }, cart: cartArray, cartIsVisible, symbol } } = this.props;
        let divCart = '';
        if (cartIsVisible && cartArray.length !== 0) {
            let cartAmount = 0;
            for (let item of cartArray) {
                cartAmount += item.amount * item.quantity;
            }
            const cartList = cartArray
                .map((item) => {
                    const itemAttributes = item.attributes;
                    const cartAttributesList = item.product.attributes.map(attribute => {
                        return <Attribute
                            onChangeAttribute={this.props.onChangeAttribute}
                            productId={item.product.id}
                            attributes={itemAttributes}
                            attribute={attribute}
                        />
                    });
                    return (<div key={item.product.id + '-cart'} className="cart-item">
                        <div className="cart-line"></div>
                        <div className="cart-col-name">
                            <div className="cart-brand">
                                {item.product.brand}
                            </div>
                            <div className="cart-name">
                                {item.product.name}
                            </div>
                            <div className="cart-amount">
                                {item.symbol + item.amount + '.00'}
                            </div>
                            {cartAttributesList}
                        </div>
                        <div className="cart-col-quantity">
                            <div className="cart-quantity-switcher-minus" onClick={() => this.onChangeQuantity(item.product.id, -1)}>−</div>
                            <div className="cart-quantity">{item.quantity}</div>
                            <div className="cart-quantity-switcher-plus" onClick={() => this.onChangeQuantity(item.product.id)}>+</div>
                        </div>
                        <div className="cart-image"><img src={item.product.gallery[0]} alt={item.product.name} /></div>
                    </div>)
                });
            divCart =
                <div className="cart-container">
                    <div key={'cart-key'} className="cart-title">Cart</div>
                    {cartList}
                    <div className="cart-total">
                        <div>Total</div>
                        <div>{symbol + cartAmount + '.00'}</div>
                    </div>
                </div>
        }
        return (<>{divCart}</>);
    }
};

export default Cart;