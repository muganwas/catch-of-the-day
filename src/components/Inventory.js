import React from 'react';
import FishForm from './AddFishForm';
import PropTypes from 'prop-types';

class Inventory extends React.Component {
    constructor (props) {
        super(props);
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish)   
    }

    renderInventory (key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                    <input type="text" name="name" value={fish.name} onChange={(e)=>(this.handleChange(e, key))} placeholder="Fish name"></input>
                    <input type="text" name="price" value={fish.price} onChange={(e)=>(this.handleChange(e, key))} placeholder="Price"></input>
                    <select value={fish.status} onChange={(e)=>(this.handleChange(e, key))} name="status">
                        <option name="available" value="available">Fresh</option>
                        <option name="unavailable" value="unavailable">Sold Out</option>
                    </select>
                    <textarea type="text" name="desc" value={fish.desc} onChange={(e)=>(this.handleChange(e, key))} placeholder="Fish Desc"></textarea>
                    <input type="text" name="image" value={fish.image} onChange={(e)=>(this.handleChange(e, key))} placeholder="Fish Image"></input>
                    <button onClick={()=>this.props.removeFish(key)}>Remove Fish</button>
            </div>
            
        )
    }
    render () {
        return (
            <div>
                <h1>Inventory</h1>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <FishForm newFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    removeFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    fishes: PropTypes.object.isRequired
}

export default Inventory;