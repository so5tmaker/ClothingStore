import React, { Component } from "react";
import Attribute from "../Attributes/Attribute";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = { reset: false };
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDetailAttribute = this.onChangeDetailAttribute.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
    }

    createMarkup(discription) { return { __html: discription }; };

    onChangeQuantity(e, id, sign = 1, mcId) {
        this.props.onChangeQuantity(e, id, sign, mcId);
    }

    onChangeImage(e) {
        this.props.onChangeImage(e);
    }

    onChangeDetailAttribute(attributeId, displayValue) {
        const {
            state:
            {
                attributes: propsAttributes,
                dbAttributes,

            }
        } = this.props;
        let attributes = propsAttributes;
        if (attributes.length === 0) {
            attributes = this.props.setSelectedAttributes(dbAttributes);
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
        const {
            state:
            {
                detailsIsVisible,
                symbol,
                innerContainer,
                attributes: propsAttributes,
                dbAttributes,
                image,
                detail
            }
        } = this.props;
        let divDetail = '';
        if (detailsIsVisible && detail.length !== 0) {
            let detailAttributes = propsAttributes;
            if (detailAttributes.length === 0) {
                detailAttributes = this.props.setSelectedAttributes(dbAttributes);
            }
            const detailList = detail
                .map((item) => {
                    const cartAttributesList = detailAttributes.map(attribute => {
                        return <Attribute
                            key={attribute.id + '-detail-' + item.id}
                            onChangeDetailAttribute={this.onChangeDetailAttribute}
                            productId={item.id}
                            attributes={detailAttributes}
                            attribute={attribute}
                            detail={detail}
                            inStock={item.inStock}
                        />
                    });
                    const price = item.prices.filter(price => price.currency.symbol === symbol)[0].amount;
                    const imageList = item.gallery.map(image => (
                        <img onClick={this.onChangeImage} key={'image' + image} src={image} alt='' />
                    ));
                    const mcId = item.id + this.props.getItemAtributesId(detailAttributes);
                    let divButton = <div key={'details-button'} className="detaill-button detaill-button-out">out of stock</div>
                    if (item.inStock) {
                        divButton = <div key={'details-button'} className="detaill-button" onClick={(e) => this.onChangeQuantity(e, item.id, 1, mcId)}>add to cart</div>
                    }
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
                            {divButton}
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
