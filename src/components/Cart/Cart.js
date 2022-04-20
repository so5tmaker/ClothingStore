import React, { Component } from "react";
import Attribute from "../Attributes/Attribute";
import ImageSlider from '../ImageSlider/ImageSlider';
import './Cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onCartClick = this.onCartClick.bind(this);
    }

    onChangeQuantity(e, id, sign = 1, mcId) {
        this.props.onChangeQuantity(e, id, sign, mcId);
    }

    onCartClick(e) {
        e.stopPropagation();
        this.props.onCommonClick();
    }

    render() {
        const { state: { cart: cartArray, cartIsVisible, innerContainer, miniCartIsVisible } } = this.props;
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
                    const mcId = item.product.id + this.props.getItemAtributesId(itemAttributes);
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
                            <div className="cart-quantity-switcher-plus" onClick={(e) => this.onChangeQuantity(e, item.product.id, 1, mcId)}>+</div>
                            <div className="cart-quantity">{item.quantity}</div>
                            <div className="cart-quantity-switcher-minus" onClick={(e) => this.onChangeQuantity(e, item.product.id, -1, mcId)}>−</div>
                        </div>
                        <div className="cart-image">
                            <ImageSlider slides={item.product.gallery} />
                        </div>
                    </div>)
                });
            const addContainer = miniCartIsVisible ? innerContainer : ''; divCart =
                <div className={"cart-container " + addContainer} onClick={this.onCartClick}>
                    <div key={'cart-key'} className="cart-title">Cart</div>
                    {cartList}
                </div>
        }
        return (<>{divCart}</>);
    }
};

export default Cart;
