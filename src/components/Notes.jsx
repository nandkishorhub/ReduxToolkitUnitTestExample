import React, { useRef, useState, useEffect } from "react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import { getNotes, editNotes } from "../reducers/noteReducer/notesReducer";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../reducers/noteReducer/alertReducer";

function Notes(props) {
  const notesData = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  console.log("notesData", notesData);

  const updateNote = (currentNote) => {
    // On click of refered button listed in below jsx , modal would popup automatically
    ref.current.click();
    setNote(currentNote);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(editNotes(note));
    // added timeout here so that second dispatch and first will not sync at a time
    setTimeout(() => {
      dispatch(
        setAlert({ message: "Updated note successfully", type: "success" })
      );
    }, 500);

    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getNotes());
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AddNote />
      {/* modal launch jsx */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      ></button>
      {/* modal jsx  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title Update
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.title}
                    minLength={3}
                    required
                  />
                  <span className="text-danger">
                    {note.title !== "" &&
                      note.title.length < 5 &&
                      "Must be mininum 5 character long"}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="description"
                    onChange={onChange}
                    value={note.description}
                    minLength={5}
                    required
                  />
                  <span className="text-danger">
                    {note.description !== "" &&
                      note.description.length < 5 &&
                      "Must be mininum 5 character long"}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="tag"
                    onChange={onChange}
                    value={note.tag}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.title.length < 5 || note.description.length < 5}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notesData.length !== 0 &&
          notesData.map((note) => {
            return (
              <NoteItem
                key={note._id}
                note={note}
                updateNote={updateNote}
                //showAlert={props.showAlert}
              />
            );
          })}
      </div>
    </>
  );
}

export default Notes;
