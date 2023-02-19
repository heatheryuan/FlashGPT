import React, { useState } from "react";
import { app, db } from "../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore"; 
import "./QuickStart.scss"

const refSets = app.firestore().collection("sets");

export default function QuickStart({handleSubmit}) {
    const [notes, setNotes] = useState();
    // const [set, setSet] = useState([]);
    const [subject, setSubject] = useState();

    return (
        <div>
            <div className='quickStart'>
                <h1>FlashGPT</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='form'>
                        <input className='subject' type='text' placeholder='Enter your class subject here...' onChange={(e) => setSubject(e.target.value)}></input>
                        <button type='submit' onClick={() => {handleSubmit(subject, notes)}}> Make flashcards! </button>
                    </div>
                    <input className='notes' type="text" placeholder='Copy and paste your class notes here...' onChange={(e) => setNotes(e.target.value)}/>
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