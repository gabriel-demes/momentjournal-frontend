import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../css/OpenJournal.css";
import { useParams, useHistory, Link } from "react-router-dom";
import EntryPage from "./EntryPage";
import {
  IoChevronForwardCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";
import NewGuest from "./NewGuest";
import { Button } from "@material-ui/core";

const PageCover = React.forwardRef((props, ref) => {
  const history = useHistory();

  const deleteJournal = () => {
    fetch(`http://localhost:3000/journals/${props.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((journal) => {
        props.setMyJournals((journals) => {
          const index = journals.indexOf([journal.id, journal.title]);
          journals.splice(index, 1);
          return [...journals];
        });
        history.push("/dashboard");
      });
  };
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
          <div className="page-header">
            <h2>{props.title}</h2>
          </div>
        <div className="page-text"></div>

        <div className="page-footer">
          {!props.isGuest ? (
            <Button onClick={deleteJournal}>
              <IoTrashOutline size={30} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const TOC = React.forwardRef((props, ref) => {
  const displayContents = () => {
    return props.entries.map((entry, index) => {
      return (
        <li>
          <Link to={`/journals/${props.jid}/${index + 1}`}>
            <span>{entry.title}</span>
          </Link>
        </li>
      );
    });
  };
  return (
    <div>
      <div className="page" ref={ref}>
        <div className="page-content">
          <h2 className="page-header">Table Of Contents </h2>
          <div className="page-text">
            <ol>{displayContents()}</ol>
          </div>
          <div className="page-footer">
            <Button onClick={props.nextButtonClick}>
              <IoChevronForwardCircleOutline size={30} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

const OpenJournal = (props) => {
  const history = useHistory();
  const refBook = useRef(null);
  const [totalPage, setTotalPage] = useState(0);
  const [title, setTitle] = useState("")
  const params = useParams();
  let jid = params["id"];
  const [entries, setEntries] = useState([{ title: "", body: "" }]);
  const [isGuest, setIsGuest] = useState(false);
  const [code, setCode] = useState("");
  const [guestErrors, setGuestErrors] = useState([]);

  const nextButtonClick = (e) => {
    refBook.current.getPageFlip().setting.disableFlipByClick = false;
    refBook.current.getPageFlip().flipNext();
    refBook.current.getPageFlip().setting.disableFlipByClick = true;
  };
  const prevButtonClick = (e) => {
    refBook.current.getPageFlip().setting.disableFlipByClick = false;
    refBook.current.getPageFlip().flipPrev();
    refBook.current.getPageFlip().setting.disableFlipByClick = true;
  };

  useEffect(() => {
    fetch(`http://localhost:3000/journals/${jid}}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) {
            return data;
          } else {
            throw data;
          }
        });
      })
      .then((journal) => {
        setEntries(journal.entries);
        setTitle(journal.title)
        setTotalPage(journal.entries.length + 1);
        if (journal.myguests.includes(props.user.id)) {
          setIsGuest(true);
        }
        refBook.current.getPageFlip().turnToPage(parseInt(params.curpage) + 1);
      })
      .catch(() => {
        history.push("/dashboard");
      });
  }, [jid, params.curpage, history, props.user.id]);

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
          entry={entry}
          totalPage={totalPage}
          newEntry={newEntry}
          deleteEntry={deleteEntry}
          isGuest={isGuest}
        />
      );
    });
  };
  const newEntry = () => {
    fetch(`http://localhost:3000/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "title", body: "body", journal_id: jid }),
    })
      .then((r) => r.json)
      .then(() => {
        fetch(`http://localhost:3000/journals/${jid}}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((r) => r.json())
          .then((journal) => {
            setEntries(journal.entries);
            setTotalPage(journal.entries.length + 1);
          });
      });
  };

  const deleteEntry = (id) => {
    fetch(`http://localhost:3000/entries/${id}}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        fetch(`http://localhost:3000/journals/${jid}}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((r) => r.json())
          .then((journal) => {
            setEntries(journal.entries);
            setTotalPage(journal.entries.length + 1);
          });
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/guests/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ code: code, journal_id: jid }),
    })
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) {
            props.setNewGuestModOpen(false);
            return data;
          } else {
            throw data;
          }
        });
      })
      .catch((data) => {
        setGuestErrors(data.errors);
      });
  };

  return (
    <div onSubmit={addUser} className="wowbook">
      <div id="testing123">
        <HTMLFlipBook
          ref={refBook}
          starZIndex={0}
          width={550}
          height={660}
          drawShadow={true}
          maxShadowOpacity={1}
          showCover={false}
          mobileScrollSupport={true}
          onChangeOrientation={(e) => e.onChangeOrientation}
          clickEventForward={true}
          disableFlipByClick={true}
          onChangeState={(e) => e.onChangeState}
          on
        >
          <PageCover
            isGuest={isGuest}
            id={jid}
            setMyJournals={props.setMyJournals}
            title = {title}
          ></PageCover>
          <TOC
            nextButtonClick={nextButtonClick}
            entries={entries}
            jid={jid}
          ></TOC>
          {pages()}
          {/* <PageCover></PageCover> */}
        </HTMLFlipBook>
        <NewGuest
          errors={guestErrors}
          journal={jid}
          addUser={addUser}
          code={code}
          setCode={setCode}
          setNewGuestModOpen={props.setNewGuestModOpen}
          newGuestModOpen={props.newGuestModOpen}
        />
      </div>
    </div>
  );
};

export default OpenJournal;
