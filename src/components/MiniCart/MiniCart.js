import React, { Component } from "react";
import MiniCartAttribute from "../MiniCartAttributes/MiniCartAttribute";
import { MiniCartContainer, MiniCartAmount } from "./MiniCart.styled";
import './MiniCart.css';

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onMiniCartClick = this.onMiniCartClick.bind(this);
    }

    onChangeQuantity(e, id, sign = 1, mcId) {
        this.props.onChangeQuantity(e, id, sign, mcId);
    }

    onMiniCartClick(e) {
        e.stopPropagation();
    }

    render() {
        const {
            state:
            {
                divOrientation:
                {
                    left
                },
                cart: miniCartArray,
                miniCartIsVisible,
                symbol,
                innerContainer,
                detailsIsVisible,
                cartIsVisible
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
                    const mcId = item.product.id + this.props.getItemAtributesId(item.attributes);
                    return (
                        <div
                            key={mcId}
                            className="mini-cart-item"
                        >
                            <div className="mc-col-name">
                                <div>
                                    {item.product.name}
                                </div>
                                <MiniCartAmount marginTop={top + 'px'}>
                                    {item.symbol + item.amount}
                                </MiniCartAmount>
                                {miniCartAttributesList}
                            </div>
                            <div className="mc-col-quantity">
                                <div className="quantity-switcher-plus" onClick={(e) => this.onChangeQuantity(e, item.product.id, 1, mcId)}>+</div>
                                <div className="quantity">{item.quantity}</div>
                                <div className="quantity-switcher-minus" onClick={(e) => this.onChangeQuantity(e, item.product.id, -1, mcId)}>−</div>
                            </div>
                            <div className="mc-col-image"><img src={item.product.gallery[0]} alt={item.product.name} /></div>
                        </div>)
                });
            divMiniCart =
                <MiniCartContainer
                    onClick={this.onMiniCartClick}
                    border={innerContainer !== '' && (detailsIsVisible || cartIsVisible)}
                    overflows={miniCartArray.length > 3}
                    left={left - 350}
                >
                    <div key={'mini-cart-key'} className="mini-cart-title"><strong>My Bag, </strong>{miniCartArray.length} items</div>
                    {miniCartList}
                    <div className="mc-total">
                        <div>Total</div>
                        <div>{symbol + miniCartAmount.toFixed(2)}</div>
                    </div>
                    <div className="mc-buttons">
                        <div onClick={this.props.cartVeiwClick} className="open-cart">view bag</div>
                        <div>check out</div>
                    </div>
                </MiniCartContainer>
        }
        return (<> {divMiniCart}</>);
    }
};

export default MiniCart;
