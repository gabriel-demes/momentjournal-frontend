import {useEffect, useState} from "react"
import Journal from "./Journal"


const JournalContainer = () => {
    
    const [myJournals, setMyJournals] = useState([])
    const [newTitle, setNewTitle] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:3000/users/1`)
            .then(r => r.json())
            .then(user => {
                setMyJournals(user["my_journals"])
            })
    }, [])

    const newJournal = () => {
        fetch(`http://localhost:3000/journals`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: newTitle, user_id: 1})
        })
            .then(r=>r.json())
            .then(journal => setMyJournals((myJournals)=> [...myJournals, journal]))
    }
    
    const displayJournals = () => {return(myJournals.map(journal => <Journal key={`${journal[0]}${journal[1]}`} id={journal[0]} title={journal[1]}/>))}
    return(
        <div>
            {displayJournals()}
            <form onSubmit={newJournal}>
                <label >NewTitle</label>
                <input  value={newTitle} name="title" onChange={e=>setNewTitle(e.target.value)}></input>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default JournalContainer
