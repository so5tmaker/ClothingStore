import React, { Component } from "react";
import MiniCartAttribute from "../MiniCartAttributes/MiniCartAttribute";
import './MiniCart.css';

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    onChangeQuantity(id, sign = 1) {
        this.props.onChangeQuantity(id, sign);
    }

    render() {
        const {
            state:
            {
                divOrientation:
                {
                    top,
                    left
                },
                cart: miniCartArray,
                miniCartIsVisible,
                symbol,
                innerContainer,
                detailsIsVisible
            }
        } = this.props;
        let divMiniCart = '';
        if (miniCartIsVisible && miniCartArray.length !== 0) {
            let miniCartAmount = 0;
            for (let item of miniCartArray) {
                miniCartAmount += item.amount * item.quantity;
            }
            const miniCartList = miniCartArray
                .map((item) => {
                    const itemAttributes = item.attributes;
                    const miniCartAttributesList = item.product.attributes.map(attribute => {
                        return <MiniCartAttribute
                            key={item.product.id + '-' + attribute.id + '-mini-cart-attribute'}
                            productId={item.product.id}
                            attributes={itemAttributes}
                            attribute={attribute}
                        />
                    });
                    const top = item.product.name.length > 17 ? '0' : '25';
                    return (<div key={item.product.id + '-' + item.product.name + '-mini-cart'} className="mini-cart-item">
                        <div className="mc-col-name">
                            <div>
                                {item.product.name}
                            </div>
                            <div className="mc-col-name-amount"
                                style={{ marginTop: top + 'px' }}>
                                {item.symbol + item.amount}
                            </div>
                            {miniCartAttributesList}
                        </div>
                        <div className="mc-col-quantity">
                            <div className="quantity-switcher-minus" onClick={() => this.onChangeQuantity(item.product.id, -1)}>−</div>
                            <div className="quantity">{item.quantity}</div>
                            <div className="quantity-switcher-plus" onClick={() => this.onChangeQuantity(item.product.id)}>+</div>
                        </div>
                        <div className="mc-col-image"><img src={item.product.gallery[0]} alt={item.product.name} /></div>
                    </div>)
                });
            let border = '';
            if (innerContainer !== '' && detailsIsVisible) {
                border = ' details-mc-cart-border';
            }
            divMiniCart =
                <div
                    className={"mini-cart-container" + border}
                    style={{ top: top + 45, left: left - 350 }}>
                    <div key={'mini-cart-key'} className="mini-cart-title"><strong>My Bag, </strong>{miniCartArray.length} items</div>
                    {miniCartList}
                    <div className="mc-total">
                        <div>Total</div>
                        <div>{symbol + miniCartAmount}</div>
                    </div>
                    <div className="mc-buttons">
                        <div onClick={this.props.cartVeiwClick} className="open-cart">view bag</div>
                        <div>check out</div>
                    </div>
                </div>
        }
        return (<>{divMiniCart}</>);
    }
};

export default MiniCart;
