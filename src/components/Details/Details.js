import React, { Component, Fragment } from "react";
import parse from 'html-react-parser';
import Attribute from "../Attributes/Attribute";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { attributes: [] };
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDetailAttribute = this.onChangeDetailAttribute.bind(this);
    }

    onChangeQuantity(id, sign = 1, attributes) {
        this.props.onChangeQuantity(id, sign, attributes);
    }

    onChangeDetailAttribute(productId, attributeId, displayValue) {
        const detail = this.props.state.products.filter((item) => (item.id === productId))[0];
        let attributes = this.state.attributes;
        if (attributes.length === 0) {
            attributes = this.props.setSelectedAttributes(detail.attributes);
        }
        attributes = attributes.map(attribute => {
            const items = attribute.items.map(item => {
                let selected = item.selected;
                if (attributeId === attribute.id) {
                    selected = item.displayValue === displayValue;
                }
                return ({ displayValue: item.displayValue, value: item.value, selected: selected });
            });
            return (
                {
                    id: attribute.id,
                    items: items
                });
        });
        this.setState({
            attributes
        });
    }

    render() {
        const { state: { products, productId, detailsIsVisible, symbol } } = this.props;
        const detail = products.filter((item) => (item.id === productId));
        let divDetail = '';
        if (detailsIsVisible && detail.length !== 0) {
            const detailList = detail
                .map((item) => {
                    let attributes = this.state.attributes;
                    if (attributes.length === 0) {
                        attributes = this.props.setSelectedAttributes(item.attributes);
                    }
                    const cartAttributesList = attributes.map(attribute => {
                        return <Attribute
                            key={attribute.id + '-detail-' + item.id}
                            onChangeDetailAttribute={this.onChangeDetailAttribute}
                            productId={item.id}
                            attributes={attributes}
                            attribute={attribute}
                            detail={true}
                        />
                    });
                    const price = item.prices.filter(price => price.currency.symbol === symbol)[0].amount;
                    const imageList = item.gallery.map(image => (
                        <img src={image} alt='' />
                    ));
                    return (<div key={item.id + '-detail'} className="details-item">
                        <div key={item.id + '-detail-image'} className="image-gallery">
                            {imageList}
                        </div>
                        <div key={'single-image'} className="single-image">
                            {<img src={item.gallery[0]} alt='' />}
                        </div>
                        <div key={'details-name'} className="details-name">
                            <div className="details-brand">
                                {item.brand}
                            </div>
                            <div className="detail-name">
                                {item.name}
                            </div>
                            <div className="detail-row-attributes">
                                {cartAttributesList}
                            </div>
                            <div className="detail-title">{'price:'}</div>
                            <div className="detail-amount">
                                {symbol + price}
                            </div>
                            <div className="detaill-button" onClick={() => this.onChangeQuantity(item.id, 1, attributes)}>add to cart</div>
                            <div className="detail-description">
                                {parse(item.description)}
                            </div>
                        </div>
                    </div>)
                });
            divDetail =
                <div key={detail[0].id + 'detail'} className="detail-container">
                    {detailList}
                </div>
        }
        return (<Fragment key={'details'}>{divDetail}</Fragment>);
    }
};

export default Details;
