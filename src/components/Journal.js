import React from "react"
import {FaBook} from 'react-icons/fa'
import { useHistory } from "react-router-dom"

const Journal = ({id, title}) => {
    const history = useHistory()
    const redirect = () => {
        history.push(`/journals/${id}/0`)
    }
    const changeMouse = e => {
        e.target.style.cursor = "pointer"
    }
    return(
        <div onClick={redirect} onMouseEnter={changeMouse}>
            <FaBook size={175}/>
            <h4>{title}</h4>
        </div>
    )
}

export default Journal
