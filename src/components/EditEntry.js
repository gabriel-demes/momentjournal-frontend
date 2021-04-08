import React, { useState } from "react";
import "../css/EditEntry.css";

const EditEntry = ({ handlePopUp, title, body, id, setTitle, setBody }) => {
    const [myTitle, setMyTitle] = useState(title);
    const [myBody, setMyBody] = useState(body);

    const handleSave = () => {
        fetch(`http://localhost:3000/entries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: myTitle, body: myBody }),
        })
        .then((r) => r.json())
        .then((entry) => {
            setTitle(entry.title);
            setBody(entry.body);
        });
    };

    const handleCancel = () => {
        handlePopUp();
    };

    return (
        <div className="hide">
        <div className="pop-up">
            <input
            value={myTitle}
            onChange={(e) => setMyTitle(e.target.value)}
            ></input>
            <textarea
            value={myBody}
            onChange={(e) => setMyBody(e.target.value)}
            ></textarea>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>cancel</button>
        </div>
    );
};

export default EditEntry;
