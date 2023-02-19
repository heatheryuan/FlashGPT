import React, { useState } from "react";
import { app, db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 

const refSets = app.firestore().collection("sets");

export default function QuickStart() {
    const [notes, setNotes] = useState();
    const [display, setDisplay] = useState();
    const [sets, setSets] = useState([]);
    const [subject, setSubject] = useState();

    const getSets = () => {
        refSets.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setSets(items);
        })
    }

    const addSet = async (data) => {
        const subjectValid = data.subject != undefined && data.subject != "";
        const notesValid = data.notes != undefined && data.notes != "";
        if (subjectValid && notesValid) {
            await setDoc(doc(collection(db, 'sets')), data);
            console.log('added document');
        }
        else {
            console.log('undefined');
        }
        
    }
    
    const handleSubmit = () => {
        const dataEntry = {
            subject: subject,
            notes: notes
        }
        addSet(dataEntry);
        getSets();
        // console.log(sets);
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
            {sets.map((set) => (
                <div>
                    <p>Subject: {set.subject}</p>
                    <p>Notes: {set.notes}</p>
                </div>
            ))}
        </div>
    )
}