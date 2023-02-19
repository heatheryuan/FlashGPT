import React, { useState } from "react";
import "./Card.scss"

const Card = ({term, definition, handleFlip, isFlipped}) => {
    // const [isFlipped, setIsFlipped] = useState(false);
    const [attempt, setAttempt] = useState();
    const [isCorrect, setIsCorrect] = useState();
    const [feedback, setFeedback] = useState();
    const [isChecking, setIsChecking] = useState();

    const callAPI = async (dataEntry) => {
        try {
            setIsChecking(true);
            await fetch('http://127.0.0.1:5000/grade_def', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataEntry)
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    const parsed = JSON.parse(data)
                    setIsCorrect(parsed[0]);
                    setFeedback(parsed[1]);
            });
        } finally {
            setIsChecking(false);
        }
        
    }
    
    const makeAttempt = () => {
        // console.log('heyyyy');
        const dataEntry = {
            term: term,
            definition: definition,
            attempt: attempt,
            mode: 'medium'
        }

        callAPI(dataEntry);
        console.log(isCorrect);
        console.log(feedback);
    }
    
    return (
        <div className="card">
            <div className="content">
                {isFlipped ? <p>{definition}</p> : 
                    <div>
                        <h2>{term}</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input className='attempt' placeholder='Take a stab at it!' type='text' onChange={(e) => setAttempt(e.target.value)}></input>
                            <button type="submit" onClick={makeAttempt}>guess</button>
                        </form>
                        {isChecking ? <h3>checking your attempt...</h3> : <p>{feedback}</p>}
                    </div>}
            </div>
        </div>
        
    )
};

export default Card;