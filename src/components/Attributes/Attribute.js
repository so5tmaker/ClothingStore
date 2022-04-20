import React, { Component } from "react";
import './Attribute.css';
import { AttributesBox } from './Attribute.styled';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
    }

    onChangeAttribute(e, productId, attributeId, displayValue, detail) {
        if (detail) {
            this.props.onChangeDetailAttribute(attributeId, displayValue);
        } else {
            this.props.onChangeAttribute(e, productId, attributeId, displayValue);
        }
    }

    render() {
        const { productId, attributes, attribute, detail, inStock } = this.props;
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
                const fnOnClick = (e) => this.onChangeAttribute(e, productId, attribute.id, item.displayValue, detail);
                return (
                    <AttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        detail={detail && inStock}
                        selected={item.selected}
                        background={item.value}
                        onClick={detail && inStock ? fnOnClick : ''}
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
                const fnOnClick = (e) => this.onChangeAttribute(e, productId, attribute.id, item.displayValue, detail);
                return (
                    <AttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        detail={detail && inStock}
                        selected={item.selected}
                        background={item.selected ? '#1d1f22' : 'white'}
                        onClick={detail && inStock ? fnOnClick : ''}
                    >
                        {displayValue}
                    </AttributesBox>
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
