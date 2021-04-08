import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../css/OpenJournal.css";
import {useParams} from "react-router-dom"
import EntryPage from "./EntryPage";


const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
            <h2>{props.children}</h2>
        </div>
        </div>
    );
});

const OpenJournal = (props) => {
    const refBook = useRef(null);
    const params = useParams()
    const jid = params["id"]
    const [entries, setEntries] = useState([{title:"", body:""}])

    const nextButtonClick = (e) => {
        console.log("working")
        refBook.current.getPageFlip().setting.disableFlipByClick = false
        refBook.current.getPageFlip().flipNext();
        refBook.current.getPageFlip().setting.disableFlipByClick = true
    };
    const prevButtonClick = (e) => {
        refBook.current.getPageFlip().flipPrev();
    };
    useEffect(() => {
        refBook.current.getPageFlip().off("flip")
    }, []);

    useEffect(()=>{
        fetch(`http://localhost:3000/journals/${jid}}`)
            .then(r => r.json())
            .then(journal => setEntries(journal.entries))
    },[jid])

    const dontClick = () => {
        refBook.current.getPageFlip().off("flip")
    }

    const pages = () => {
        return (entries?.map(entry => <EntryPage  key={`${entry.id}${entry.title}`} dontClick={dontClick} refBook={refBook} nextButtonClick={nextButtonClick} prevButtonClick={prevButtonClick} number={entry.id} entry={entry}/>))
    }

    return (
     
    <div>
        <HTMLFlipBook
            ref={refBook}
            starZIndex={0}
            width={300}
            height={400}
            // width={450}
            // height={733}
            drawShadow={true}
            maxShadowOpacity={1}
            showCover={false}
            mobileScrollSupport={true}
            // onFlip={onPage}
            onChangeOrientation={(e) => e.onChangeOrientation}
            // useMouseEvents={false}
            clickEventForward={true}
            disableFlipByClick={true}
            onChangeState={(e) => e.onChangeState}
            on
        >
            {/* <PageCover>BOOK TITLE</PageCover>   
            <PageCover>THE END</PageCover> */}
            <PageCover></PageCover>
            
            {pages()}
            {/* <PageCover></PageCover> */}
        </HTMLFlipBook>
        
        
    </div>
    );
};

export default OpenJournal;
