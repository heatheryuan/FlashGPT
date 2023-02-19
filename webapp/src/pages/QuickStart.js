import React, { useState } from "react";
import { app, db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 

const refSets = app.firestore().collection("sets");

export default function QuickStart({handleSubmit}) {
    const [notes, setNotes] = useState();
    // const [set, setSet] = useState([]);
    const [subject, setSubject] = useState();

    return (
        <div>
            <div className='quickStart'>
                <h1>Quick Start Flashcards</h1>
                <h3>Copy and paste your notes below to get started!</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='text' onChange={(e) => setSubject(e.target.value)}></input>
                    <input type="text" onChange={(e) => setNotes(e.target.value)}/>
                    <button type='submit' onClick={() => {handleSubmit(subject, notes)}}> Make flashcards! </button>
                </form>
            </div>
        </div>
    )
}

    // const getSets = () => {
    //     refSets.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         })
    //         setSets(items);
    //     })
    // }

    // const addSet = async (data) => {
    //     const subjectValid = data.subject != undefined && data.subject != "";
    //     const notesValid = data.notes != undefined && data.notes != "";
    //     if (subjectValid && notesValid) {
    //         await setDoc(doc(collection(db, 'sets')), data);
    //         console.log('added document');
    //     }
    //     else {
    //         console.log('undefined');
    //     }
    // }

    // const callAPI = (dataEntry) => {
    //     fetch('http://127.0.0.1:5000/flashcards', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(dataEntry)
    //         })
    //         .then(response => response.text())
    //         .then(data => {
    //             const parsed = JSON.parse(data);
    //             setSet(parsed);
    //     });
    // }
    
    // const handleSubmit = () => {
    //     const dataEntry = {
    //         subject: subject,
    //         notes: notes
    //     }
    //     setLoading(true);
    //     callAPI(dataEntry);
    //     // setLoading(false);
    //     // setDisplay(`Subject: ${dataEntry.subject}\nNotes: ${dataEntry.notes}`);
    // }