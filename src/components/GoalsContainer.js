import React, {useState} from "react"
import GoalList from "./GoalList"
import "../css/Goals.css"

const GoalsContainer = ({lists, user}) => {
    const [myLists, setMyLists] = useState(lists)
    const [title, setTitle] = useState("Title")

    const displayLists = myLists?.map(list => <GoalList key={list.id} list={list} setMyLists={setMyLists}/>)

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
            <form onSubmit={makeList}>
                <h4>New List</h4>
                <input onChange={e=> setTitle(e.target.value)} value={title} ></input>
                <input type="submit"></input>
            </form>
            {displayLists}
        </div>
    )
}

export default GoalsContainer