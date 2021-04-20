import React, {useEffect, useState} from "react"
import Goal from "./Goal"
import "../css/Goals.css"
import { Button, TextField } from "@material-ui/core"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"

const GoalList = ({list, setMyLists}) => {
    
    const [add, setAdd] = useState(false)
    const [goals, setGoals] = useState([])
    const [title, setTitle] = useState("Title")
    useEffect(()=>{
        fetch(`http://localhost:3000/goallists/${list.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(`token`)}`
            }})
            .then(r=> r.json())
            .then(list => setGoals(list.goals))
    },[list])

    const displayGoals = goals?.map(goal => {
        return(
            <Goal key={goal.id} goal={goal} setGoals={setGoals}/>
        )
    })

    const deleteList = () => {
        fetch(`http://localhost:3000/goallists/${list.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(list => {
            setMyLists(lists => lists.filter(a => a.id!== list.id))})
    }

    const newGoal = () => {
        setAdd(add => !add)
    }

    const addGoal = e => {
        e.preventDefault()
        fetch(`http://localhost:3000/goals`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({goallist_id: list.id, title: title})
        })
        .then(r => r.json())
        .then(goal => {
            setGoals(goals => [...goals, goal])
            setTitle("Title")
            setAdd(false)
        })
    }

    return (
        <div className="goallist">
            <h3>{list.title}</h3>
            <section style={{paddingLeft:"1em"}}>
            <Button onClick={newGoal} startIcon={<IoAddCircleOutline size={25} color="rgb(0, 76, 104)"/>}></Button>
            <Button style={{textAlign:"center"}}  startIcon={<IoTrashOutline size={25} color="rgb(0, 76, 104)"/>} onClick={deleteList}></Button>
            </section>
            {add ? 
            <form onSubmit={addGoal}>
                <TextField value={title} onChange={e=>setTitle(e.target.value)}></TextField>
                <Button variant="text" color="rgb(0, 76, 104)" onClick={e=> addGoal(e)}>Submit</Button>
            </form> :null}

            <div className="goalsss">
                {displayGoals}
            </div>
        </div>
    )
}

export default GoalList