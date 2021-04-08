import React, { useState, useEffect} from "react";
import "../css/EditEntry.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const EditEntry = ({ handlePopUp, title, body, id, setTitle, setBody }) => {
    const [myTitle, setMyTitle] = useState(title);
    const [myBody, setMyBody] = useState(body);
    
    const commands = [
        {
            command: "journal stop listening",
            callback: ()=> handleStop()
        },
        {
            command: "journal title is *",
            callback: (title) => setMyTitle(title)
        },
        {
            command: "journal save entry",
            callback: () => handleSave()
        }
    ]
    const {resetTranscript , finalTranscript} = useSpeechRecognition({commands})

    const handleSave = () => {
        SpeechRecognition.stopListening()
        resetTranscript()
        fetch(`http://localhost:3000/entries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: myTitle, body: myBody }),
        })
        .then((r) => r.json())
        .then((entry) => {
            setTitle(entry.title);
            setBody(entry.body)
            handlePopUp();
        });
    };

    useEffect(()=>{
        setMyBody(myBody=> (myBody + " " + finalTranscript).replace(/Journal stop listening| Journal save entry| Journal title is [a-z0-9\s]*/gi,''))
        resetTranscript()
    }, [finalTranscript])

    const handleCancel = () => {
        handlePopUp();
    };

    const handleStart = () => {
        SpeechRecognition.startListening({continuous: true})
        
    }
    const handleStop = () => {
        SpeechRecognition.stopListening()
        resetTranscript()
    }
    

    return (
        <div className="hide">
        <div className="pop-up">
            <input
            value={myTitle}
            onChange={(e) => setMyTitle(e.target.value)}
            ></input>
            <textarea
            value={myBody}
            onChange={(e) => setMyBody(e.target.value)}
            ></textarea>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>cancel</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        </div>
    );
};

export default EditEntry;
