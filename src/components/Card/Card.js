import React, { Component } from "react";
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="image-container">
          <img src={imageUrl} />
        </div>
        <div className="card-title">
          {title}
        </div>
        <div className="card-price">
          <strong>{price}</strong>
        </div>
      </div>
    );
  }
};

export default Card;
