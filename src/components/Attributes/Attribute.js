import React, { Component } from "react";
import './Attribute.css';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
    }

    onChangeAttribute(productId, attributeId, displayValue, detail = false) {
        if (detail) {
            this.props.onChangeDetailAttribute(attributeId, displayValue);
        } else {
            this.props.onChangeAttribute(productId, attributeId, displayValue);
        }
    }

    render() {
        const { productId, attributes, attribute, detail } = this.props;
        let divMiniCartItem = '';
        let mcItems = '';
        let attributeBoxCart = ' attributes-box-cart';
        if (detail) {
            attributeBoxCart = '';
        }
        if (attribute.id === "Color") {
            let idItemAttribute = attributes.find(item => item.id === attribute.id);
            if (idItemAttribute === undefined) {
                idItemAttribute = attributes[0].items;
            } else {
                idItemAttribute = idItemAttribute.items;
            }
            mcItems = idItemAttribute.map(item => {
                let value = '';
                if (!item.selected) {
                    value = '#A6A6A6 solid 1px';
                }
                return (
                    <div key={attribute.id + '-' + item.displayValue}
                        className={"attributes-box" + attributeBoxCart}
                        onClick={detail ? () => this.onChangeAttribute(productId, attribute.id, item.displayValue, detail) : ''}
                        style={{ background: item.value, border: value }}
                    >
                    </div>
                )
            });
        } else {
            let idItemAttribute = attributes.find(item => item.id === attribute.id);
            if (idItemAttribute === undefined) {
                idItemAttribute = attributes[0].items;
            } else {
                idItemAttribute = idItemAttribute.items;
            }
            const valueConverse = [
                { id: "Small", value: "S" },
                { id: "Medium", value: "M" },
                { id: "Large", value: "L" },
                { id: "Extra Large", value: "XL" }
            ];
            mcItems = idItemAttribute.map(item => {
                let displayValue = item.displayValue;
                let disableAttributeValue = ' attributes-box-disable';
                if (item.selected) {
                    disableAttributeValue = '';
                }
                const attributeValue = valueConverse.find(val => val.id === item.displayValue);
                if (attributeValue !== undefined) {
                    displayValue = attributeValue.value;
                }
                return (
                    <div key={attribute.id + '-' + item.displayValue}
                        className={"attributes-box" + disableAttributeValue + attributeBoxCart}
                        onClick={detail ? () => this.onChangeAttribute(productId, attribute.id, item.displayValue, detail) : ''}
                    >
                        {displayValue}
                    </div>
                )
            });
        }
        let detailAttributeTitle = '';
        if (detail) {
            detailAttributeTitle = ' detail-attribute-title';
        }
        divMiniCartItem = <div key={productId + '-' + attribute.id}>
            <div className={"attribute-title" + detailAttributeTitle}>{attribute.id + ':'}</div>
            <div className="cart-col-attributes">{mcItems}</div>
        </div>;
        return (<>{divMiniCartItem}</>);
    }
};

export default Attribute;
