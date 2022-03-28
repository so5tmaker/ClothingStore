import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class navbar extends Component {
    render() {
        return (
            <div>
                <li>
                    <Link to="/">ALL</Link>
                </li>
                <li>
                    <Link to="/tech">TECH</Link>
                </li>
                <li>
                    <Link to="/clothes">CLOTHES</Link>
                </li>
                <li>
                    <Link to="/currency">$</Link>
                </li>
                <li>
                    <Link to="/cart">CART</Link>
                </li>
            </div >
        )
    }
}

export default navbar;