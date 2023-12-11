import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("success", "Note added successfully.")
  };
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3 text-center">
        <h3> Add a new note to your cloud : </h3>
        <form className="my-3">
          <div className="mb-3 text-center">
            <label htmlFor="title" className="form-label">
              Enter the title for your note :
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="description" className="form-label">
              Enter the description :
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="tag" className="form-label">
              Enter the tag :
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}
