import React from "react"
import {FaBook} from 'react-icons/fa'
import { useHistory } from "react-router-dom"
import {randomColor} from "randomcolor"

const Journal = ({id, title}) => {
    const history = useHistory()
    const redirect = () => {
        history.push(`/journals/${id}/0`)
    }
    const changeMouse = e => {
        e.target.style.cursor = "pointer"
    }
    return(
        <div >
            <div className="journal-icon-container" onClick={redirect} onMouseEnter={changeMouse}>
             <FaBook 
                id="book-shadow"
                size={150} 
                color={randomColor({
                    luminosity:"dark",
                    hue: "#008FCC"
                })}
                // style={
                //     {marginLeft: "6em"},
                //     {marginRight:"7em"}
                // }
            />
            </div>
            <h4 style={{textAlign: "center"}}>{title}</h4>
        </div>
    )
}

export default Journal
