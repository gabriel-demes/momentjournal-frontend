import React, { useState, useEffect } from "react";
import "../css/OpenJournal.css";
import {IoSadOutline,IoHappyOutline, IoAddCircleOutline, IoChevronForwardCircleOutline, IoChevronBackCircleOutline  } from "react-icons/io5";
import EditEntry from "./EditEntry";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = { [-1]:<IoSadOutline size={15}/>, 1:<IoHappyOutline size={15}/> }

const EntryPage = React.forwardRef((props, ref) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setId] = useState("");
    const [sentiment, setSentiment] = useState(null)
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
    const getSentiment = () => {
        fetch(`http://localhost:3000/entries/${id}/sentiment`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({journal_id: id, entrybody: body})
        })
            .then(r=>r.json())
            .then(sent => setSentiment(sent))
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
                <button style={{display:"block"}} onClick={getSentiment}>Show Sentiment</button>
                {sentiment && 
                    <Slider 
                        disabled 
                        style={{width:"20em"}}
                        min={-1} 
                        max={1} 
                        value={sentiment} 
                        marks={marks}
                        trackStyle={{backgroundColor: sentiment > 0 ? "green" : "red"}}
                    />
                }
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
