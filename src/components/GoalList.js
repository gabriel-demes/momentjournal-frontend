import React, {useEffect, useState} from "react"
import Goal from "./Goal"
import "../css/Goals.css"

const GoalList = ({list}) => {

    const [goals, setGoals] = useState([])
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
            <Goal key={goal.id} goal={goal}/>
        )
    })

    return (
        <div className="goallist">
            <h3>{list.title}</h3>
            {displayGoals}
        </div>
    )
}

export default GoalList