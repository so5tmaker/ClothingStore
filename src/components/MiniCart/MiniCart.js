import React, { Component } from "react";
import './MiniCart.css';

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    onChangeQuantity(e) {
        this.props.onChangeQuantity(e.target.title);
    }

    render() {
        const { state: { divOrientation: { top, left }, cart: miniCartArray, miniCartIsVisible, symbol }} = this.props;
        let divMiniCart = '';
        if (miniCartIsVisible && miniCartArray.length !== 0) {
            let miniCartAmount = 0;
            for (let item of miniCartArray) {
                miniCartAmount += item.amount * item.quantity;
            }
            const miniCartList = miniCartArray.filter(item => item.product.id !== undefined)
                .map((item) => {
                    const miniCartAttributesList = item.product.attributes.map(attribute => {
                        let divMiniCartItem = '';
                        if (attribute.id === "Color") {
                            const mcItems = attribute.items.map(item => {
                                return (
                                    <div className="mc-quantity-switcher" style={{ background: item.value }}></div>
                                )
                            });
                            divMiniCartItem = <div>
                                <div>{attribute.id + ':'}</div>
                                <div className="mc-col-attributes">{mcItems}</div>
                            </div>;
                        }
                        return (<>{divMiniCartItem}</>
                        );
                    });
                    return (<div key={item.product.id + 'mini-cart'} className="mini-cart-item">
                        <div className="mc-col-name">
                            <div>
                                {item.product.name}
                            </div>
                            <div>
                                {item.symbol + item.amount + '.00'}
                            </div>
                            {miniCartAttributesList}
                        </div>
                        <div className="mc-col-quantity">
                            <div className="mc-quantity-switcher">−</div>
                            <div className="mc-quantity">{item.quantity}</div>
                            <div className="mc-quantity-switcher">+</div>
                        </div>
                        <div className="mc-col-image"><img src={item.product.gallery[0]} alt={item.product.name} /></div>
                    </div>)
                });
            divMiniCart =
                <div
                    className="mini-cart-container"
                    style={{ top: top + 45, left: left - 350 }}>
                    <div key={'mini-cart-key'} className="mini-cart-title"><strong>My Bag, </strong>{miniCartArray.length} items</div>
                    {miniCartList}
                    <div className="mc-total">
                        <div>Total</div>
                        <div>{symbol + miniCartAmount + '.00'}</div>
                    </div>
                    <div className="mc-buttons">
                        <div>view bag</div>
                        <div>check out</div>
                    </div>
                </div>
        }
        return (<>{divMiniCart}</>);
    }
};

export default MiniCart;
