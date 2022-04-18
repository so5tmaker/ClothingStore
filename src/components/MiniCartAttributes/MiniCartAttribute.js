import React, { Component } from "react";
import { MiniCartAttributesBox } from './MiniCartAttribute.styled';
import './MiniCartAttribute.css';

class MiniCartAttribute extends Component {
    render() {
        const { productId, attributes, attribute } = this.props;
        let divMiniCartItem = '';
        let mcItems = '';
        let unitOfMeasurement = '';
        if (attributes.length === 0) {
            return ('');
        }
        let idItemAttribute = attributes.find(item => item.id === attribute.id);
        if (idItemAttribute === undefined) {
            idItemAttribute = attributes[0].items;
        } else {
            idItemAttribute = idItemAttribute.items;
        }
        if (attribute.id === "Color") {
            mcItems = idItemAttribute.map(item => {
                return (
                    <MiniCartAttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        selected={item.selected}
                        background={item.value}
                    />
                )
            });
        } else {
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
                unitOfMeasurement = '';
                if (attribute.id === "Capacity") {
                    displayValue = displayValue.substring(0, 3);
                    unitOfMeasurement = ', GB';
                }
                return (
                    <MiniCartAttributesBox
                        key={attribute.id + '-' + item.displayValue}
                        selected={item.selected}
                        background={item.selected ? 'white' : '#ededed'}
                    >{displayValue}</MiniCartAttributesBox>
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
