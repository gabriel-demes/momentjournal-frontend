import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../css/OpenJournal.css";

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
            <h2>{props.children}</h2>
        </div>
        </div>
    );
});
const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
        <div className="page-content">
            <h2 className="page-header">Page header - {props.number}</h2>
            <div className="page-image"></div>
            <div className="page-text">{props.children}</div>
            <div className="page-footer">{props.number + 1}</div>
        </div>
        </div>
    );
});

const OpenJournal = (props) => {
    const refBook = useRef(null);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const nextButtonClick = (e) => {
        refBook.current.getPageFlip().flipNext();
    };
    const prevButtonClick = (e) => {
        refBook.current.getPageFlip().flipPrev();
    };
    const onPage = (e) => {
        setPage(e.data);
    };
    useEffect(() => {
        setTotalPage(refBook.current.getPageFlip().getPageCount());
    }, []);

    return (
        <>
        <div className="container">
            <div>
            <button type="button" onClick={prevButtonClick}>
                Previous page
            </button>
            [<span>{page}</span> of
            <span>{totalPage}</span>]
            <button type="button" onClick={nextButtonClick}>
                Next page
            </button>
            </div>
        </div>
        <HTMLFlipBook
            ref={refBook}
            width={300}
            height={400}
            width={450}
            height={733}
            drawShadow={true}
            maxShadowOpacity={1}
            showCover={false}
            mobileScrollSupport={false}
            onFlip={onPage}
            onChangeOrientation={(e) => e.onChangeOrientation}
            onChangeState={(e) => e.onChangeState}
        >
            <PageCover>BOOK TITLE</PageCover>
            <Page number={1}>Lorem ipsum...</Page>
            <Page number={2}>Lorem ipsum...</Page>
            <Page number={3}>Lorem ipsum...</Page>
            <Page number={4}>Lorem ipsum...</Page>
            <PageCover>THE END</PageCover>
        </HTMLFlipBook>
        
        </>
    );
};

export default OpenJournal;
