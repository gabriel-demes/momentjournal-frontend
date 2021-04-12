import React from "react"
import GoalList from "./GoalList"
import "../css/Goals.css"

const GoalsContainer = ({lists}) => {

    const displayLists = lists?.map(list => <GoalList key={list.id} list={list}/>)

    return (
        <div className="goalscontainer">
            {displayLists}
        </div>
    )
}

export default GoalsContainer