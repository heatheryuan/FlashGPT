import React, { useState } from "react";
import Card from "./Card";

const Flashcards = ({flashcards, handleBack}) => {
    const [index, setIndex] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    
    const handleNext = () => {
        if (index + 1 < flashcards.length) {
            setIndex(index+1);
        } else {
            setIsEnd(true);
        }
    }

    return (
        <div>
            {isEnd ? 
            <div>
                <h2>You finished the deck!</h2>
                <button onClick={handleBack}>back</button>
            </div>
             : 
            <div>
                <Card term={flashcards[index].term} definition={flashcards[index].definition} />
                <button onClick={handleNext}>next</button>
            </div>
            }
            
        </div>
    )
};

export default Flashcards;