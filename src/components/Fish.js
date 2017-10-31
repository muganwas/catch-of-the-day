import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component {

    render () {
        const {dits, index} = this.props;
        const isAvailable = dits.status === 'available';
        const buttonText = isAvailable? "Add To Cart":"Sold Out";
        return(
            <li className="menu-fish">
                <img src={dits.image} alt={dits.name} />
                <h3 className="fish-name">{dits.name}</h3>
                <span className="price">{formatPrice(dits.price)}</span>
                <p>{dits.desc}</p>
                <button onClick={() => this.props.addToOrder(index)} id="add_to_cart" disabled={!isAvailable}>{buttonText}</button>
            </li>
        )     
    }
}
export default Fish;