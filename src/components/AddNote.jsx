import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotes } from "../reducers/noteReducer/notesReducer";
import { setAlert } from "../reducers/noteReducer/alertReducer";

function AddNote(props) {
  const dispatch = useDispatch();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addNotes(note));
    dispatch(setAlert({ message: "Note added successfully", type: "success" }));
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Create new note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minLength={5}
            required
          />
          <span className="text-danger">
            {note.title !== "" &&
              note.title.length < 5 &&
              "Must be mininum 5 character long"}
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
          />
          <span className="text-danger">
            {note.description !== "" &&
              note.description.length < 5 &&
              "Must be minimum 5 character long"}
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 5 || note.description.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
