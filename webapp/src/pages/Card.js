import React, { useState } from "react";
// import "./Card.scss"

const Card = ({term, definition}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    return (
        <div className="card">
            {isFlipped ? <p>{definition}</p> : <p>{term}</p>}
            <button onClick={() => setIsFlipped(!isFlipped)}>flip</button>
        </div>
    )
};

export default Card;