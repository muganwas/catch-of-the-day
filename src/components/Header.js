import React from 'react';

const Header = (props) => {
    return (
        <header className="top">
            <h1>Catch
            <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
            </span>
            Day</h1>
            <h3><span>{props.tagline}</span></h3>
        </header>
    )
}

Header.propTypes = {
    tagline: React.propTypes.string.isRequired
}
export default Header;