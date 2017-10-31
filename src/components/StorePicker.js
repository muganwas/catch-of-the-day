import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    goToStore (event) {
        event.preventDefault();
        var storeId = this.storeInput.value;
        this.context.router.transitionTo(`/store/${storeId}`);
    }
    render () {
        return (
            <form className="store-selector" onSubmit={ this.goToStore.bind(this) } >
                <h2>Please enter store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={ getFunName() }  
                ref={ (e) => { this.storeInput = e}}/>
                <button type="submit">Visit Store &rarr;</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}
export default StorePicker;