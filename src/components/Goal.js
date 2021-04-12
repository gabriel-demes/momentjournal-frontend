import React, {useState} from "react"
import "../css/Goals.css"

const Goal = ({goal, setGoals}) => {
    const [isComplete, setIsComplete] = useState(goal.completed)

    const toggleComplete = () => {
        fetch(`http://localhost:3000/goals/${goal.id}`, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({id: goal.id, completed: !isComplete})
        })
        .then(r => r.json())
        .then(goal => setIsComplete(goal.completed))
    }

    const deleteGoal = () => {
        fetch(`http://localhost:3000/goals/${goal.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(goal => {
            setGoals(goals => goals.filter(a=> a.id !== goal.id))
        })
    }
    return (
        <div className="goal">
            <input onChange={toggleComplete} type="checkbox" checked={isComplete}></input>
            <button onClick={deleteGoal}>X</button>
            <h4>{goal.title}</h4>
            <p>{goal.completed}</p>
        </div>
    )
}

export default Goal