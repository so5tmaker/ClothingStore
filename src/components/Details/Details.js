import React, { Component } from "react";
import Attribute from "../Attributes/Attribute";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDetailAttribute = this.onChangeDetailAttribute.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    createMarkup(discription) { return { __html: discription }; };

    onChangeQuantity(id, sign = 1, attributes) {
        this.props.onChangeQuantity(id, sign, attributes);
    }

    onChangeImage(e) {
        this.props.onChangeImage(e);
    }

    onChangeDetailAttribute(productId, attributeId, displayValue) {
        const detail = this.props.state.products.filter((item) => (item.id === productId))[0];
        let attributes = this.props.state.attributes;
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
        this.props.changeAttributes(attributes);
    }

    render() {
        const { state: { products, productId, detailsIsVisible, symbol, innerContainer, attributes: propsAttributes, image } } = this.props;
        const detail = products.filter((item) => (item.id === productId));
        let divDetail = '';
        if (detailsIsVisible && detail.length !== 0) {
            const detailList = detail
                .map((item) => {
                    let detailAttributes = propsAttributes;
                    if (detailAttributes.length === 0) {
                        detailAttributes = this.props.setSelectedAttributes(item.attributes);
                    }
                    const cartAttributesList = detailAttributes.map(attribute => {
                        return <Attribute
                            key={attribute.id + '-detail-' + item.id}
                            onChangeDetailAttribute={this.onChangeDetailAttribute}
                            productId={item.id}
                            attributes={detailAttributes}
                            attribute={attribute}
                            detail={true}
                        />
                    });
                    const price = item.prices.filter(price => price.currency.symbol === symbol)[0].amount;
                    const imageList = item.gallery.map(image => (
                        <img onClick={this.onChangeImage} key={'image' + image} src={image} alt='' />
                    ));
                    return (<div key={item.id + '-detail'} className="details-item">
                        <div key={item.id + '-detail-image'} className="image-gallery">
                            {imageList}
                        </div>
                        <div key={'single-image'} className="single-image">
                            {<img src={image === '' ? item.gallery[0] : image} alt='' />}
                        </div>
                        <div key={'details-name'} className="details-name">
                            <div key={'details-brand'} className="details-brand">
                                {item.brand}
                            </div>
                            <div key={'detail-name'} className="detail-name">
                                {item.name}
                            </div>
                            <div key={'detail-row-attributes'} className="detail-row-attributes">
                                {cartAttributesList}
                            </div>
                            <div key={'detail-title'} className="detail-title">{'price:'}</div>
                            <div key={'details-amount'} className="detail-amount">
                                {symbol + price}
                            </div>
                            <div key={'details-button'} className="detaill-button" onClick={() => this.onChangeQuantity(item.id, 1, detailAttributes)}>add to cart</div>
                            <div key={'details-description'} className="detail-description"
                                dangerouslySetInnerHTML={this.createMarkup(item.description)}
                            />
                        </div>
                    </div>)
                });
            divDetail =
                <div key={detail[0].id + 'detail'} className={"detail-container " + innerContainer} >
                    {detailList}
                </div>
        }
        return (<>{divDetail}</>);
    }
};

export default Details;
