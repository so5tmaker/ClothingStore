import React, { Component } from "react";
import { CurrrencyItem, CurrrencyList } from './Currency.styled';

class Currency extends Component {
    constructor(props) {
        super(props);
        this.currencyClick = this.currencyClick.bind(this);
    }

    currencyClick(e) {
        this.props.currencyClick(e);
    }

    render() {
        const { currencies, currencyIsVisible, top, left } = this.props;
        const currencyArray = currencies.map(currency => {
            const name = currency.label + ' ' + currency.symbol;
            return (
                <CurrrencyItem
                    key={name}
                    onClick={this.currencyClick}
                >
                    {name}
                </CurrrencyItem>
            )
        });
        return (currencyIsVisible &&
            <CurrrencyList top={top} left={left}>
                {currencyArray}
            </CurrrencyList>)
    }
};

export default Currency;
