import React, { useState, useEffect } from "react";
import "../css/OpenJournal.css";
import {
  IoChevronForwardCircleOutline,
  IoChevronBackCircleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import EditEntry from "./EditEntry";

const EntryPage = React.forwardRef((props, ref) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setId] = useState("");
    const handlePopUp = (e) => {
        setEdit((e) => !e);
    };
    useEffect(() => {
        setTitle(props.entry.title);
        setBody(props.entry.body);
        setId(props.entry.id);
    }, [props.entry.title, props.entry.id, props.entry.body]);
    
    const pageDirection = () => {
        if(props.number % 2 !== 0 && props.number !== props.totalPage -1){
            return(
                <button onClick={props.nextButtonClick}>
                    <IoChevronForwardCircleOutline size={30} />
                </button>)
        }else if(props.number % 2 !== 0 && props.number === props.totalPage -1){
            return(
                <button onClick={()=>props.newEntry()}>
                    <IoAddCircleOutline size={30}/>
                </button>
            )
        }else if(props.number % 2 === 0 && props.number !== props.totalPage -1){
            return(
                <button onClick={props.prevButtonClick}>
                    <IoChevronBackCircleOutline size={30} />
                </button>
            )
        }else{return(
            <button onClick={()=>props.newEntry()}>
                <IoAddCircleOutline size={30}/>
            </button>
        )}
    }
    
    return (
        <div>
        <div className="page" ref={ref}>
            <div className="page-content">
            <h2 className="page-header">{title} </h2>
            <div onClick={handlePopUp} className="page-text">
                {body}
            </div>
            <div className="page-footer">
                {pageDirection()}
                {props.number}
            </div>
            </div>
        </div>
        {edit && (
            <EditEntry
            handlePopUp={handlePopUp}
            id={id}
            title={title}
            body={body}
            setTitle={setTitle}
            setBody={setBody}
            deleteEntry={props.deleteEntry}
            />
        )}
        </div>
    );
});

export default EntryPage;
