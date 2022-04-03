import React, { Component } from "react";
import './MiniCartAttribute.css';

class MiniCartAttribute extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
    }

    onChangeQuantity(id, sign = 1) {
        this.props.onChangeQuantity(id, sign);
    }

    onChangeAttribute(productId, attributeId, displayValue) {
        this.props.onChangeAttribute(productId, attributeId, displayValue);
    }

    render() {
        const { productId, attributes, attribute } = this.props;
        let divMiniCartItem = '';
        let mcItems = '';
        let unitOfMeasurement = '';
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
                        className={"mc-attributes-box"}
                        onClick={() => this.onChangeAttribute(productId, attribute.id, item.displayValue, item.value)}
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
                let disableAttributeValue = 'mc-attributes-box-disable';
                if (item.selected) {
                    disableAttributeValue = '';
                }
                const attributeValue = valueConverse.find(val => val.id === item.displayValue);
                if (attributeValue !== undefined) {
                    displayValue = attributeValue.value;
                }
                unitOfMeasurement = '';
                if (attribute.id === "Capacity") {
                    displayValue = displayValue.substring(0, 3);
                    unitOfMeasurement = ', GB';
                }
                return (
                    <div key={attribute.id + '-' + item.displayValue}
                        className={"mc-attributes-box " + disableAttributeValue}
                        onClick={() => this.onChangeAttribute(productId, attribute.id, item.displayValue)}
                    >
                        {displayValue}
                    </div>
                )
            });
        }
        divMiniCartItem = <>
            <div key={productId + '-' + attribute.id}>{attribute.id + unitOfMeasurement + ':'}</div>
            <div className="mc-col-attributes">{mcItems}</div>
        </>;
        return (<>{divMiniCartItem}</>);
    }
};

export default MiniCartAttribute;
