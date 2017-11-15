import React from 'react';
import FishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';

class Inventory extends React.Component {
    constructor (props) {
        super(props);
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount() {
        base.onAuth((user)=> {
            if(user){
                this.authHandler(null, {user});
            }
        });
    }
    
    logout () {
        base.unauth();
        this.setState({
            uid: null
        })
    }

    authenticate(provider) {
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler (err, authData) {
        if(err) {
            console.error(err);
            return;
        }
        //get the store id
        const storeRef = base.database().ref(this.props.storeId);
        //query datase once for store data
        storeRef.once('value', (snapshot)=> {
            const data = snapshot.val() || {};
            //get the uid from the authData
            const uid = authData.user.uid;
            //check if store has an owner
            if(!data.owner) {
                //console.log(user);
                storeRef.set({
                    owner: uid
                });
            }
            this.setState({
                uid: uid,
                owner: data.owner || uid
            });
            
        });
    }

    handleChange (e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish)   
    }

    renderLogin () {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store inventory</p>
                <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with Facebook</button>
                <button className="google" onClick={()=>this.authenticate('google')}>Login with Google</button>
                <button className="github" onClick={()=>this.authenticate('github')}>Login with Github</button>
            </nav>
        )
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
        const logout = <div><button onClick={()=> {this.logout()}}>Log out</button></div>
        //check if someone is not logged in
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }
        //if not the owner of the store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    {logout}
                    <p>Sorry you are not the owner of this store!</p>
                </div>
            )
        }
        return (
            <div>
                <h1>Inventory</h1>
                {logout}
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
    fishes: PropTypes.object.isRequired,
    storeId: PropTypes.string.isRequired
}

export default Inventory;