import { Button, ButtonGroup, makeStyles } from "@material-ui/core"
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
    const displayGuests = () => {return(guestList.map(journal => <Journal key={`${journal[0]}${journal[1]}`} id={journal[0]} title={journal[1]} author={journal[2]}/>))}

    const myJournalsStyle = makeStyles(theme => ({
        root:{
            backgroundColor: isMyJournals ? "rgb(0 76 104)" : null,
            color: isMyJournals ? "white" : null,
            fontFamily:"Kalam"
        }
    }))
    const guestJournalsStyle = makeStyles(theme => ({
        root:{
            backgroundColor: !isMyJournals ? "rgb(0 76 104)" : null,
            color: !isMyJournals ? "white" : null,
            fontFamily:"Kalam"
        }
    }))

    const mjClasses = myJournalsStyle()
    const guestClasses = guestJournalsStyle()
    
    return(
        <div>
            <ButtonGroup variant="contained" size="large" style={{marginTop:"2em"}}>
                <Button className={mjClasses.root} color="rgb(0, 76, 104)"  onClick={()=> setIsMyJournals(true)}>My Journals</Button>
                <Button className={guestClasses.root} onClick={()=> setIsMyJournals(false)}>Guest Journals</Button>
            </ButtonGroup>
            <div className="journalContainer">
                {isMyJournals ? displayJournals():displayGuests()}        
                <NewJournalForm newJournal={newJournal}  modOpen={modOpen} setModOpen={setModOpen}/>
            </div>
        </div>
    )
}

export default JournalContainer
