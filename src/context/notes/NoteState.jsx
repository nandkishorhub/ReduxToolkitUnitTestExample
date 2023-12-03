import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const url = host + `/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const jsonData = await response.json();
     setNotes(jsonData);
  };
  // Get al note

  // Add a note
  const addNote = async (note, props) => {
    const url = host + `/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    const jsonData = await response.json();
    setNotes(notes.concat(jsonData));
    // eslint-disable-next-line react/prop-types
    props.showAlert("Note added successfully", "success");
  };

  // Edit a note
  const editNote = async (note, props) => {
    const { _id, title, description, tag } = note;
    const url = host + `/api/notes/updatenote/${_id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });

    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === _id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    setNotes([...notes]);
    props.showAlert("Note updated successfully", "success");
  };

  // Delete a note
  const deleteNote = async (id, props) => {
    console.log("id", id);
    const url = host + `/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const jsonData = await response.json();
    console.log("Deleteed data ", jsonData, notes);
    if (jsonData.note._id === id) {
      const filterNotes = notes.filter((note) => note._id !== id);
      props.showAlert("Note deleted successfully", "success");
      setNotes(filterNotes);
    } else {
      props.showAlert("Failed to delete", "danger");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
