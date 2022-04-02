import React, { Component } from "react";
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
        const { state: { divOrientation: { top, left }, cart: miniCartArray, miniCartIsVisible, symbol } } = this.props;
        let divMiniCart = '';
        if (miniCartIsVisible && miniCartArray.length !== 0) {
            let miniCartAmount = 0;
            for (let item of miniCartArray) {
                miniCartAmount += item.amount * item.quantity;
            }
            const miniCartList = miniCartArray.filter(item => item.product.id !== undefined)
                .map((item) => {
                    const itemAttributes = item.attributes;
                    const miniCartAttributesList = item.product.attributes.map(attribute => {
                        let divMiniCartItem = '';
                        let mcItems = '';
                        if (attribute.id === "Color") {
                            let idItemAttribute = itemAttributes.find(id => id === attribute.id);
                            if (idItemAttribute === undefined) {
                                idItemAttribute = attribute.items[0];
                            }
                            mcItems = attribute.items.map(item => {
                                let value = '';
                                if (idItemAttribute.displayValue !== item.displayValue) {
                                    value = '#A6A6A6 solid 1px';
                                }
                                return (
                                    <div className={"mc-attributes-box"} style={{ background: item.value, border: value }}></div>
                                )
                            });
                        } else {
                            let capasityStyle = '';
                            if (attribute.id === "Capacity") {
                                capasityStyle = 'mc-capasity-style';
                            }
                            let idItemAttribute = itemAttributes.find(id => id === attribute.id);
                            if (idItemAttribute === undefined) {
                                idItemAttribute = attribute.items[0];
                            }
                            const valueConverse = [
                                { id: "Small", value: "S" },
                                { id: "Medium", value: "M" },
                                { id: "Large", value: "L" },
                                { id: "Extra Large", value: "XL" }
                            ];
                            mcItems = attribute.items.map(item => {
                                let displayValue = item.displayValue;
                                let disableAttributeValue = 'mc-attributes-box-disable';
                                if (idItemAttribute.displayValue === item.displayValue) {
                                    disableAttributeValue = '';
                                }
                                const attributeValue = valueConverse.find(val => val.id === item.displayValue);
                                if (attributeValue !== undefined) {
                                    displayValue = attributeValue.value;
                                }
                                return (
                                    <div className={"mc-attributes-box " + disableAttributeValue + " " + capasityStyle}>{displayValue}</div>
                                )
                            });
                        }
                        divMiniCartItem = <>
                            <div>{attribute.id + ':'}</div>
                            <div className="mc-col-attributes">{mcItems}</div>
                        </>;
                        return (<>{divMiniCartItem}</>);
                    });
                    return (<div key={item.product.id + '-mini-cart'} className="mini-cart-item">
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
                            <div className="mc-quantity-switcher-minus" onClick={() => this.onChangeQuantity(item.product.id, -1)}>−</div>
                            <div className="mc-quantity">{item.quantity}</div>
                            <div className="mc-quantity-switcher-plus" onClick={() => this.onChangeQuantity(item.product.id)}>+</div>
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
