import React, {useState} from "react"
import GoalList from "./GoalList"
import "../css/Goals.css"
import NewGoalList from "./NewGoalList"

const GoalsContainer = ({lists, user, newGModOpen, setNewGModOpen, setMyLists}) => {
    
    const [title, setTitle] = useState("Title")

    const displayLists = lists?.map(list => <GoalList key={list.id} list={list} setMyLists={setMyLists}/>)

    const makeList = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/goallists`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({user_id: user.id, title: title})
        })
        .then(r => r.json())
        .then(list => {
            setMyLists(myLists => [...myLists, list])
            setTitle("")
        })
    }
    return (
        <div className="goalscontainer">
            {displayLists}
            <NewGoalList setMyLists={setMyLists} setTitle={setTitle} makeList={makeList} newGModOpen={newGModOpen} setNewGModOpen={setNewGModOpen}/>
        </div>
    )
}

export default GoalsContainer