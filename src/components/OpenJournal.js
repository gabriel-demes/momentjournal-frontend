import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../css/OpenJournal.css";
import { useParams, useHistory, Link} from "react-router-dom";
import EntryPage from "./EntryPage";
import {IoChevronForwardCircleOutline} from "react-icons/io5"

const PageCover = React.forwardRef((props, ref) => {
    const history = useHistory()

    const deleteJournal = () => {
        fetch(`http://localhost:3000/journals/${props.id}`,{
            method: "DELETE"
        })
            .then(r => r.json())
            .then(()=> history.push('/me'))
    }
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
            
        </div>
        <button onClick={deleteJournal}>Delete</button>
        </div>
    );
});

const TOC = React.forwardRef((props, ref) => {

    const displayContents = () => {
        return props.entries.map((entry, index)=> {
            return(
                <li>
                    <Link to={`/journals/${props.jid}/${index + 1}`}>
                        <span>{entry.title}</span>
                    </Link>
                </li>
            )
        })
    }
    return (
        <div>
            <div className="page" ref={ref}>
                <div className="page-content">
                    <h2 className="page-header">Table Of Contents </h2>
                    <div className="page-text">
                        <ol>
                            {displayContents()}
                        </ol>
                    </div>
                    <div className="page-footer">
                        <button onClick={props.nextButtonClick}>
                            <IoChevronForwardCircleOutline size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

})


const OpenJournal = (props) => {
    const history = useHistory()
    const refBook = useRef(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const params = useParams();
    let jid = params["id"];
    let [curpage, setCurpage] = useState(params["curpage"])
    const [entries, setEntries] = useState([{ title: "", body: "" }]);
    const onPage = (e) => {
        setPage(refBook.current.getPageFlip().getCurrentPageIndex() +1);
    };

    const nextButtonClick = (e) => {
        refBook.current.getPageFlip().setting.disableFlipByClick = false;
        refBook.current.getPageFlip().flipNext();
        refBook.current.getPageFlip().setting.disableFlipByClick = true;
    };
    const prevButtonClick = (e) => {
        refBook.current.getPageFlip().flipPrev();
    };


    useEffect(() => {
        fetch(`http://localhost:3000/journals/${jid}}`)
        .then((r) => r.json())
        .then((journal) => {
            setEntries(journal.entries)
            setTotalPage(journal.entries.length +1)
            refBook.current.getPageFlip().turnToPage(parseInt(params.curpage)+1)
        });
    }, [jid, curpage]);

    useEffect(()=> {
        setCurpage(params.curpage)
    }, [params.curpage])

    const pages = () => {
        let num = 0;
        return entries?.map((entry) => {
        num += 1;
        return (
            <EntryPage
            key={`${entry.id}${entry.title}`}
            refBook={refBook}
            nextButtonClick={nextButtonClick}
            prevButtonClick={prevButtonClick}
            number={num}
            entry={entry} totalPage={totalPage}
            totalPage={totalPage}
            newEntry={newEntry}
            deleteEntry={deleteEntry}
            />
        );
        });
    };
    const newEntry = () =>{
        fetch(`http://localhost:3000/entries`,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({title:"title", body:"body", journal_id: jid})
        })
            .then(r=>r.json)
            .then(()=>{
                fetch(`http://localhost:3000/journals/${jid}}`)
                    .then((r) => r.json())
                    .then((journal) => {
                        setEntries(journal.entries)
                        setTotalPage(journal.entries.length +1)
                    })}
            )
    }

    const deleteEntry = id => {
        fetch(`http://localhost:3000/entries/${id}}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(()=>{
            fetch(`http://localhost:3000/journals/${jid}}`)
            .then((r) => r.json())
            .then((journal) => {
                setEntries(journal.entries)
                setTotalPage(journal.entries.length +1)
            })}
    )
    }

const testing = () => {
    refBook.current.getPageFlip().turnToPage(3)
}

    return (
        <div>
            <button onClick={testing}>TESTINGGG</button>
            <HTMLFlipBook
                ref={refBook}
                starZIndex={0}
                width={500}
                height={600}
                drawShadow={true}
                maxShadowOpacity={1}
                showCover={false}
                mobileScrollSupport={true}
                onFlip={onPage}
                onChangeOrientation={(e) => e.onChangeOrientation}
                clickEventForward={true}
                disableFlipByClick={true}
                onChangeState={(e) => e.onChangeState}
                on
            >
                <PageCover id={jid}></PageCover>
                <TOC nextButtonClick={nextButtonClick} setCurpage={setCurpage} entries={entries} jid={jid}></TOC>
                {pages()}
                {/* <PageCover></PageCover> */}
            </HTMLFlipBook>
        </div>
    );
};

export default OpenJournal;
