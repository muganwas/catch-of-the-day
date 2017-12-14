import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import Samples from '../sample-fishes';
import firebase from 'firebase';
import base from '../base';
import PropTypes from 'prop-types'
  
class App extends React.Component {
    constructor () {
        super();
        this.addFish = this.addFish.bind(this);/*bind addFish to the app*/
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.removeOFish = this.removeOFish.bind(this)

        this.state = {
            fishes: {},
            order: {}
        };
    } 

    addFish (fish) {
        const fishes={...this.state.fishes};/*creating the array and storing the current state*/
        const timestamp=Date.now();
        fishes[`fish-${timestamp}`]=fish;
        this.setState({ fishes });/*prevState is just descriptive*/
    }

    loadSamples () {
        this.setState({
            fishes: Samples
        });
        const rootRef = firebase.database().ref(this.props.params.storeId).child('fishes');
        rootRef.set(Samples) 
        this.setState({
            fishes: Samples
        }) 
    }

    addToOrder (key) {
        const order={...this.state.order};        
        order[key]=order[key] + 1 || 1;
        this.setState({ order });
    }

    updateFish (key, updatedFish) {
        const fish = {...this.state.fishes};
        fish[key] = updatedFish;
        this.setState({
            fishes: fish
        });
    }

    removeFish (key) {
        const fish={...this.state.fishes};
        fish[key]= null;/*firebase doesn't accept delete? not sure*/
        this.setState({
            fishes:fish
        });
    }

    removeOFish (key) {
        const fish={...this.state.order};
        delete fish[key];/*we are not limited by firebase here so delete works*/
        this.setState({
            order:fish
        });
    }

    componentWillMount () {
        //executed right before the app is loaded
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
        const store_name = `Store-${this.props.params.storeId}`;
        const stored_items = localStorage.getItem(store_name);
        if(stored_items !== null ) {
            //let s_items = JSON.parse(stored_items);
            this.setState({
                order: JSON.parse(stored_items)
            });
        }
    }
    
    componentWillUnmount() {
        base.removeBinding(this.ref); 
    }

    componentWillUpdate(nextProps, nextState) {
        let store_name = `Store-${this.props.params.storeId}`;
        if(nextState !== null || nextState !== undefined || nextState !== "" ) {
            localStorage.setItem(store_name, JSON.stringify(nextState.order)); 
        }       
    }
    
    render () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                <Header tagline="fresh seafood market" />
                <ul className="list-of-fishes">
                   {Object.keys(this.state.fishes).map(key => <Fish onClick={this.onClick} key={key} index={key} dits={this.state.fishes[key]} addToOrder={this.addToOrder} /> )}                   
                </ul>
                </div>
                <Order removeOFish={this.removeOFish} fishes={this.state.fishes} order={this.state.order} />
                <Inventory removeFish={this.removeFish} updateFish={this.updateFish} addFish={ this.addFish } loadSamples={this.loadSamples} fishes={this.state.fishes} storeId={this.props.params.storeId} />
            </div>
        )
    }
}
App.propTypes = {
    params: PropTypes.object.isRequired
}
export default App;