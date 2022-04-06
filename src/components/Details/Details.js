import React, { Component } from "react";
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
        const { state: { cart: cartArray, detailsIsVisible } } = this.props;
        let divCart = '';
        if (detailsIsVisible && cartArray.length !== 0) {
            const cartList = cartArray
                .map((item) => {
                    const itemAttributes = item.attributes;
                    const cartAttributesList = item.product.attributes.map(attribute => {
                        return <Attribute
                            key={attribute.id}
                            onChangeAttribute={this.props.onChangeAttribute}
                            productId={item.product.id}
                            attributes={itemAttributes}
                            attribute={attribute}
                        />
                    });
                    const imageList = item.product.gallery.map(image => (
                        <img src={image} alt='' />
                    ));
                    return (<div key={item.product.id + '-cart'} className="details-item">
                        <div className="image-gallery">
                            {imageList}
                        </div>
                        <div className="single-image">
                            {<img src={item.product.gallery[0]} alt='' />}
                        </div>
                        <div className="details-name">
                            <div className="details-brand">
                                {item.product.brand}
                            </div>
                            <div className="detail-name">
                                {item.product.name}
                            </div>
                            <div className="detail-row-attributes">
                                {cartAttributesList}
                            </div>
                            <div className="detail-title">{'price:'}</div>
                            <div className="detail-amount">
                                {item.symbol + item.amount + '.00'}
                            </div>
                            <div className="detaill-button" onClick={() => this.onChangeQuantity(item.product.id)}>add to cart</div>
                            <div className="detail-description">
                                {item.product.description}
                            </div>
                        </div>
                    </div>)
                });
            divCart =
                <div className="detail-container">
                    {cartList}
                </div>
        }
        return (<>{divCart}</>);
    }
};

export default Details;
