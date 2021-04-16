import React from "react"
import MyCalendar from "./Calendar"
import JournalContainer from "./JournalContainer"
import "../css/Dashboard.css";


const Dashboard = ({user, guestList, setNewJModOpen, newJModOpen, myJournals, setMyJournals}) => {

    return (
        <div className="dashboard">
            <h1 style={{textAlign:"center"}}>My Journals</h1>
            <JournalContainer guestList={guestList} user={user} myJournals={myJournals} setMyJournals={setMyJournals} setModOpen={setNewJModOpen} modOpen={newJModOpen}/>
            
            <MyCalendar user={user}/>
        </div>
    )
}
export default Dashboard