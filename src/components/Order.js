import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);     
    }
    renderOrder(key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={()=>this.props.removeOFish(key)}>&times;</button>;
        if (!fish || fish.status === 'unavailable') {
            return <li key={ key } > Sorry, { fish ? fish.name : 'fish' }
            is not available {removeButton}</li>
        } else {
            return (
                <li key={ key } >
                    <span >
                        <CSSTransitionGroup
                        component="span"
                        className="count"
                        transitionName="count"
                        transitionEnterTimeout={250}
                        transitionLeaveTimeout={250}
                        >
                            <span key={count}>{ count } </span>
                        </CSSTransitionGroup>
                        lbs { fish.name } 
                    </span> 
                    <span >
                        { formatPrice(count * fish.price) } 
                    </span>
                    {removeButton}
                </li>   
            );
        }
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        let total = 0;
        const len = orderIds.length;
        if (len > 0) {/*due to the presence of the _proto_ objec in every object stored in the localstorage you cannot start at 0*/
            total = orderIds.reduce((prevTotal, key) => {
                const fish = this.props.fishes[key];
                const count = this.props.order[key];
                const isAvailable = fish && fish.status === 'available';
                if (isAvailable && (count !== null && count !== undefined && count !== "")) {
                    const price = fish.price;
                    return prevTotal + (price * count || 0);
                }
                return prevTotal;
            }, 0);
        }

        return ( 
            <div className="order-wrap" >
                <h2> Your Order </h2> 

                <CSSTransitionGroup className="order"
                component="ul"
                transitionName="order"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                    { orderIds.map(this.renderOrder) } 
                    <li className="total" >
                        <strong > Total </strong> { formatPrice(total) } 
                    </li> 
                </CSSTransitionGroup>

            </div>            
        )
    }
}

Order.propTypes = {
    removeFish: PropTypes.func,
    fishes: PropTypes.object.isRequired
}
export default Order;