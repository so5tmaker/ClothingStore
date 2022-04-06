import React, { Component, Fragment } from "react";
import parse from 'html-react-parser';
import Attribute from "../Attributes/Attribute";
import './Details.css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    onChangeQuantity(id, sign = 1) {
        this.props.onChangeQuantity(id, sign);
    }

    render() {
        const { state: { products, productId, detailsIsVisible, symbol } } = this.props;
        const detail = products.filter((item) => (item.id === productId));
        let divDetail = '';
        if (detailsIsVisible && detail.length !== 0) {
            const detailList = detail
                .map((item) => {
                    const itemAttributes = this.props.setSelectedAttributes(item.attributes);
                    const cartAttributesList = itemAttributes.map(attribute => {
                        return <Attribute
                            key={attribute.id + '-detail-' + item.id}
                            onChangeAttribute={this.props.onChangeAttribute}
                            productId={item.id}
                            attributes={itemAttributes}
                            attribute={attribute}
                        />
                    });
                    const price = item.prices.filter(price => price.currency.symbol === symbol)[0].amount;
                    const imageList = item.gallery.map(image => (
                        <img src={image} alt='' />
                    ));
                    return (<div key={item.id + '-detail'} className="details-item">
                        <div className="image-gallery">
                            {imageList}
                        </div>
                        <div className="single-image">
                            {<img src={item.gallery[0]} alt='' />}
                        </div>
                        <div className="details-name">
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
                                {symbol + price + '.00'}
                            </div>
                            <div className="detaill-button" onClick={() => this.onChangeQuantity(item.product.id)}>add to cart</div>
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
