import {useEffect, useState} from "react"
import Journal from "./Journal"


const JournalContainer = () => {
    
    const [myJournals, setMyJournals] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3000/users/1`)
            .then(r => r.json())
            .then(user => {
                setMyJournals(user["my_journals"])
            })
    }, [])
    
    const displayJournals = () => {return(myJournals.map(journal => <Journal key={`${journal[0]}${journal[1]}`} id={journal[0]} title={journal[1]}/>))}
    return(
        <div>
            {displayJournals()}
        </div>
    )
}

export default JournalContainer
