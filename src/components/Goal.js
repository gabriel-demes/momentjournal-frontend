import { Button, ButtonGroup, Checkbox } from "@material-ui/core"
import React, {useState} from "react"
import { IoHeartSharp, IoTrashOutline } from "react-icons/io5"
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
            <ButtonGroup variant="text">
            <Checkbox 
            icon={<IoHeartSharp color={isComplete? "red":"white"} />}
             onChange={toggleComplete} 
             checkedIcon={<IoHeartSharp color={isComplete? "red":"white"} />}
             >
             </Checkbox>
            <Button 
                onClick={deleteGoal}
                startIcon={<IoTrashOutline color="white"></IoTrashOutline>}
                style={{paddingLeft:"2em"}}
            ></Button>
            </ButtonGroup>
            <h4>{goal.title}</h4>
        </div>
    )
}

export default Goal