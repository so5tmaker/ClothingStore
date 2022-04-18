import React, { Component } from "react";
import './Attribute.css';
import { AttributesBox } from './Attribute.styled';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
    }

    onChangeAttribute(productId, attributeId, displayValue, detail) {
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
        if (attribute.id === "Color") {
            let idItemAttribute = attributes.find(item => item.id === attribute.id);
            if (idItemAttribute === undefined) {
                idItemAttribute = attributes[0].items;
            } else {
                idItemAttribute = idItemAttribute.items;
            }
            mcItems = idItemAttribute.map(item => {
                return (
                    <AttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        detail={detail}
                        selected={item.selected}
                        background={item.value}
                        onClick={detail ? () => this.onChangeAttribute(productId, attribute.id, item.displayValue, detail) : ''}
                    />
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
                const attributeValue = valueConverse.find(val => val.id === item.displayValue);
                if (attributeValue !== undefined) {
                    displayValue = attributeValue.value;
                }
                return (
                    <AttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        detail={detail}
                        selected={item.selected}
                        background={item.selected ? '#1d1f22' : 'white'}
                        onClick={detail ? () => this.onChangeAttribute(productId, attribute.id, item.displayValue, detail) : ''}
                    >{displayValue}</AttributesBox>
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
