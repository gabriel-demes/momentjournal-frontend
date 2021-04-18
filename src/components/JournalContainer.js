import { Button, ButtonGroup } from "@material-ui/core"
import React,{useState} from "react"
import Journal from "./Journal"
import NewJournalForm from "./NewJournalForm"
// import "../css/Journalcontainer.css";


const JournalContainer = ({modOpen, setModOpen, user, myJournals, setMyJournals, guestList}) => {
    
    const [isMyJournals, setIsMyJournals] = useState(true)

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
    const displayGuests = () => {return(guestList.map(journal => <Journal key={`${journal[0]}${journal[1]}`} id={journal[0]} title={journal[1]}/>))}

    return(
        <div>
            <ButtonGroup variant="contained" size="large" style={{marginTop:"2em"}}>
                <Button clicked className="on-tab" color="rgb(0, 76, 104)" lassName={isMyJournals ? "on-tab" : null} onClick={()=> setIsMyJournals(true)}>My Journals</Button>
                <Button onClick={()=> setIsMyJournals(false)}>Guest Journals</Button>
            </ButtonGroup>
            <div className="journalContainer">
                {isMyJournals ? displayJournals():displayGuests()}        
                <NewJournalForm newJournal={newJournal}  modOpen={modOpen} setModOpen={setModOpen}/>
            </div>
        </div>
    )
}

export default JournalContainer
