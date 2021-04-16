import React from "react"
import Journal from "./Journal"
import NewJournalForm from "./NewJournalForm"
// import "../css/Journalcontainer.css";


const JournalContainer = ({modOpen, setModOpen, user, myJournals, setMyJournals}) => {
    
    
    
    const newJournal = (e, newTitle) => {
        // e.preventDefault()
        fetch(`http://localhost:3000/journals`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: newTitle, user_id: user.id})
        })
            .then(r=>r.json())
            .then(journal => {setMyJournals((myJournals)=> [...myJournals, [journal.id, journal.title]])})
    }
    
    const displayJournals = () => {return(myJournals.map(journal => <Journal key={`${journal[0]}${journal[1]}`} id={journal[0]} title={journal[1]}/>))}
    return(
        <div className="journalContainer">
            {displayJournals()}
    
            <NewJournalForm newJournal={newJournal}  modOpen={modOpen} setModOpen={setModOpen}/>
        </div>
    )
}

export default JournalContainer
