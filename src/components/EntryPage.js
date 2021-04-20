import React, { useState, useEffect } from "react";
import "../css/OpenJournal.css";
import {IoSadOutline,IoHappyOutline, IoAddCircleOutline, IoChevronForwardCircleOutline, IoChevronBackCircleOutline  } from "react-icons/io5";
import EditEntry from "./EditEntry";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button } from "@material-ui/core";

const marks = { [-1]:<IoSadOutline size={15}/>, 1:<IoHappyOutline size={15}/> }

const EntryPage = React.forwardRef((props, ref) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setId] = useState("");
    const [sentiment, setSentiment] = useState(null)
    const [modOpen, setModOpen] = useState(false)
    const [date, setDate] = useState("")

    useEffect(() => {
        console.log(new Date(props.entry.created_at))
        setTitle(props.entry.title);
        setBody(props.entry.body);
        setId(props.entry.id)
        setDate(new Date(props.entry.created_at).toDateString());
    }, [props.entry.title, props.entry.id, props.entry.body, props.entry.date]);

    const formatedBody = body.split("\n").map((paragraph, index) => <p style={{textIndent:"2em"}} key={title + index}>{paragraph}</p>)
    
    const pageDirection = () => {
        if(props.number % 2 === 0 && props.number !== props.totalPage -1){
            return(
                <Button onClick={props.nextButtonClick}>
                    <IoChevronForwardCircleOutline size={30} />
                </Button>)
        }else if(props.number % 2 === 0 && props.number === props.totalPage -1){
            return(
                <>
                { !props.isGuest &&
                <Button onClick={()=>props.newEntry()}>
                    <IoAddCircleOutline size={30}/>
                </Button> }
                </>
            )
        }else if(props.number % 2 !== 0 && props.number !== props.totalPage -1){
            return(
                <Button onClick={props.prevButtonClick}>
                    <IoChevronBackCircleOutline size={30} />
                </Button>
            )
        }else{return(
            <>
            {!props.isGuest &&
            <Button onClick={()=>props.newEntry()}>
                <IoAddCircleOutline size={30}/>
            </Button>}
            <Button onClick={props.prevButtonClick}>
            <IoChevronBackCircleOutline size={30} />
            </Button>
            </>
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
            <h2 className="page-header">
                {title}<br/>
                {date}
            </h2>
            <div onClick={()=> !props.isGuest && setModOpen(true)} className="page-text">
                {formatedBody}
            </div>
            <div className="page-footer">
                <Button variant="outlined" size="small" style={{display:"block"}} onClick={getSentiment}>Show Sentiment</Button>
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
        {modOpen &&<EditEntry deleteEntry={props.deleteEntry} title={title} setTitle={setTitle} setBody={setBody} body={body} modOpen={modOpen} setModOpen={setModOpen} id={id}/>}
        </div>
    );
});

export default EntryPage;
