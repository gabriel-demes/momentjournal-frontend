import React, { useState, useEffect} from "react";
import "../css/EditEntry.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel } from "@material-ui/core";
import {IoMicOutline, IoStopOutline, IoTrashOutline, IoSaveOutline, IoReturnDownBack} from "react-icons/io5"



const EditEntry = ({title, body, id, setTitle, setBody, deleteEntry, modOpen, setModOpen }) => {
    
    const [myTitle, setMyTitle] = useState(title);
    const [myBody, setMyBody] = useState(body);
    const languages = {Arabic: "ar-JO", Bulgarian: "bg", Czech:"cs", English:"en-Us", French:"fr-FR", Mandarin: "zh-Cn", Cantonese: "zh-TW", Russian: "ru", Spanish:"es-PR", Turkish:"tr", Polish: "pl", Korean: "ko", Japanese: "ja", Dutch:"nl-NL", Catalan: "ca", Greek: "el-GR", Italian: "it-IT"}
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
        },
        {
            command: "journal language is *", 
            callback: (language) => {                
                handleStart(languages[language])
            }
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
            setModOpen(false)
        });
    };

    useEffect(()=>{
        setMyBody(myBody=> (myBody + " " + finalTranscript).replace(/Journal stop listening| Journal save entry| Journal title is [a-z0-9\s]* | Journal language is [a-z0-9\s]*/gi,''));
        resetTranscript();
    }, [finalTranscript])

    const handleCancel = () => {
        SpeechRecognition.stopListening()
        resetTranscript()
        setModOpen(false);
    };

    const handleStart = (lang) => {
        SpeechRecognition.startListening({continuous: true, language: lang})
        
    }
    const handleStop = () => {
        SpeechRecognition.stopListening()
        resetTranscript()
    }
    
    const handleDelete = () => {
        deleteEntry(id)
        setModOpen(false)
    }

    const handleClose = () => {
        setModOpen(false);
      }

    return (
        <Dialog 
        disableBackdropClick={true} maxWidth="md" fullWidth={true} open={modOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="test">Edit {title}</DialogTitle>
        <DialogContent>
        <InputLabel focused={true} htmlFor="title-field">Title</InputLabel>
        <TextField
            id="title-field"
            autoFocus
            margin="dense"
            label="title"
            fullWidth
            value={myTitle}
            onChange={(e) => setMyTitle(e.target.value)}
          />
          <InputLabel focused={true} htmlFor="body-field">Body</InputLabel>
          <TextField
            id="body-filed"
            variant="outlined"
            multiline={true}
             aria-label="maximum height"
            autoFocus
            margin="dense"
            fullWidth
            value={myBody}
            onChange={(e) => setMyBody(e.target.value)}
            rowsMin="25"
            rowsMax="50"
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<IoSaveOutline/>} onClick={handleSave}>Save</Button>
          <Button startIcon={<IoReturnDownBack/>} onClick={handleCancel}>cancel</Button>
          <Button startIcon={<IoMicOutline/> } onClick={()=> handleStart("en-US")}>Start</Button>
          <Button startIcon={<IoStopOutline/>} onClick={handleStop}>Stop</Button>
          <Button startIcon={<IoTrashOutline/>} onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    );
};
export default EditEntry;
