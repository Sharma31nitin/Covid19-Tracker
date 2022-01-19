import React from 'react';

import './Worldstats.css'

const WorldStats = props => {
    return (
        <div className="worldStats-box">
            <h1 className="totalNumbers">{props.total}</h1>
            <p className="about">{props.about}</p>
        </div>
    )
}

export default WorldStats