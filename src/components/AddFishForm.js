import React from 'react';

class FishForm extends React.Component {
    createFish (e) {
        e.preventDefault();
        
        const fish = {
            name: this.name.value,
            price: this.price.value,
            availability: this.availability.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.newFish(fish);
        this.fishForm.reset();
    }
    render () {
        return (
            <div>
                <form ref={(e) => this.fishForm = e } className="fish-edit" onSubmit={ this.createFish.bind(this) }>
                    <input ref={ (e)=> this.name = e } type="text" placeholder="Fish name"></input>
                    <input ref={ (e)=> this.price = e } type="text" placeholder="Price"></input>
                    <select ref={ (e)=> this.availability = e }>
                        <option value="available">Fresh</option>
                        <option value="unavailable">Sold Out</option>
                    </select>
                    <textarea ref={ (e)=> this.desc = e } type="text" placeholder="Fish Desc"></textarea>
                    <input ref={ (e)=> this.image = e } type="text" placeholder="Fish Image"></input>
                    <button type="submit"> + Add Fish</button>
                </form>
            </div>
            
        )
    }
}
export default FishForm;