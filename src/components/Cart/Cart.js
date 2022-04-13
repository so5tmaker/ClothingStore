import React, { Component } from "react";
import Attribute from "../Attributes/Attribute";
import ImageSlider from '../ImageSlider/ImageSlider';
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
        const { state: { cart: cartArray, cartIsVisible } } = this.props;
        let divCart = '';
        if (cartIsVisible && cartArray.length !== 0) {
            const cartList = cartArray
                .map((item) => {
                    const itemAttributes = item.attributes;
                    const cartAttributesList = item.product.attributes.map(attribute => {
                        return <Attribute
                            key={item.product.id + '-' + attribute.id + '-cart-attribute'}
                            productId={item.product.id}
                            attributes={itemAttributes}
                            attribute={attribute}
                        />
                    });
                    return (<div key={item.product.id + '-' + item.product.name + '-cart'} className="cart-item">
                        <div className="cart-line"></div>
                        <div className="cart-col-name">
                            <div className="cart-brand">
                                {item.product.brand}
                            </div>
                            <div className="cart-name">
                                {item.product.name}
                            </div>
                            <div className="cart-amount">
                                {item.symbol + item.amount}
                            </div>
                            <div className="cart-row-attributes">
                                {cartAttributesList}
                            </div>
                        </div>
                        <div className="cart-col-quantity">
                            <div className="cart-quantity-switcher-minus" onClick={() => this.onChangeQuantity(item.product.id, -1)}>−</div>
                            <div className="cart-quantity">{item.quantity}</div>
                            <div className="cart-quantity-switcher-plus" onClick={() => this.onChangeQuantity(item.product.id)}>+</div>
                        </div>
                        <div className="cart-image">
                            <ImageSlider slides={item.product.gallery} />
                        </div>
                    </div>)
                });
            divCart =
                <div className="cart-container">
                    <div key={'cart-key'} className="cart-title">Cart</div>
                    {cartList}
                </div>
        }
        return (<>{divCart}</>);
    }
};

export default Cart;
