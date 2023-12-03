import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletNotes } from "../reducers/noteReducer/notesReducer";
import { setAlert } from "../reducers/noteReducer/alertReducer";

const colorList = [
  "#BDC3C7",
  "#F5CBA7",
  "#DC7633",
  "#5D6D7E",
  "#1B4F72",
  "#F1948A",
  "#EBDEF0 ",
  "#82E0AA ",
  "#85C1E9",
  "#CD6155 ",
];

function NoteItem(props) {
  const { note, updateNote } = props;
  const dispatch = useDispatch();
  const [color, setcolor] = useState("white");
  useEffect(() => {
    const currntColor = colorList[Math.floor(Math.random() * colorList.length)];
    setcolor(currntColor);
  }, []);

  const deleteNoteHandler = (id) => {
    dispatch(deletNotes(note._id));
    setTimeout(() => {
      dispatch(
        setAlert({ message: "Note Deleted Successfully", type: "success" })
      );
    }, 500);
  };

  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ backgroundColor: color }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={deleteNoteHandler}
            // eslint-disable-next-line react/prop-types
            data-testid={note.tag}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={() => updateNote(note)}
            // eslint-disable-next-line react/prop-types
            data-testid={note.tag+"edit"}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
