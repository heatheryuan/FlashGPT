import React, { useState } from "react";
import createSet from "../assets/utilities";

export default function QuickStart() {
    const [data, setData] = useState();
    const [notes, setNotes] = useState();
    const [display, setDisplay] = useState();
    const [selected, setSelected] = useState(false);
    const [subject, setSubject] = useState();
    
    const handleSubmit = () => {
        const dataEntry = {
            subject: subject,
            notes: notes
        }
        setData(dataEntry);
        createSet(dataEntry);
        setDisplay(`Subject: ${dataEntry.subject}\nNotes: ${dataEntry.notes}`);
    }

    return (
        <div>
            <h1>Quick Start Flashcards</h1>
            <h3>Copy and paste your notes below to get started!</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type='text' onChange={(e) => setSubject(e.target.value)}></input>
                <input type="text" onChange={(e) => setNotes(e.target.value)}/>
                <button type='submit' onClick={handleSubmit}> Make flashcards! </button>
            </form>
            <p>{display}</p>
        </div>
    )
}