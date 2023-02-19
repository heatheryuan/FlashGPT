import React, { useState } from "react";
import './App.css';
import QuickStart from './pages/QuickStart';
import Flashcards from './pages/Flashcards';

function App() {
  const [flashcards, setFlashcards] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const callAPI = async (dataEntry) => {
    try {
      setLoading(true);
      await fetch('http://127.0.0.1:5000/flashcards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataEntry)
        })
        .then(response => response.text())
        .then(data => {
            setFlashcards(JSON.parse(data));
      });
    } finally {
      setLoading(false);
      setLoaded(true);
    }
}
  
  const makeFlashcards = (subject, notes) => {
    const dataEntry = {
      subject: subject,
      notes: notes
    }
  
    callAPI(dataEntry);
    // console.log(flashcards);
    // setDisplay(`Subject: ${dataEntry.subject}\nNotes: ${dataEntry.notes}`);
  }
  
  return (
    <div className="App">
      {!loaded ? <QuickStart handleSubmit={makeFlashcards}/> : <Flashcards flashcards={flashcards} handleBack={() => setLoaded(false)}/>}
      {loading && <h1>Loading...</h1>}
    </div>
  );
}

export default App;
