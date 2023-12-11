import React, { useEffect, useRef } from "react";
import { useContext , useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  let navigate = useNavigate();
  const [note, setNote] = useState({ id: "", etitle: "", edescription:"", etag:"" });
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNote();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const updateNote = async (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };
  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setNote({etitle: "", edescription: "", etag: ""});
    refClose.current.click();
    props.showAlert("success", "Note updated successfully.")
  }
    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div style={{marginTop : "60px"}}>
      <AddNote showAlert = {props.showAlert}/>
      <div className="row text-center">
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
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
                  Edit your Note:{" "}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">


                <form className="my-3">
                  <div className="mb-3 text-center">
                    <label htmlFor="etitle" className="form-label">
                      Enter the title for your note :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <label htmlFor="edescription" className="form-label">
                      Enter the description :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <label htmlFor="etag" className="form-label">
                      Enter the tag :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={handleChange}
                    />
                  </div>
                </form>


              </div>
              <div className="modal-footer">
                <button
                ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
        <h3> Your Notes: </h3>
        <div className="container my-3">
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert}/>
          );
        })}
      </div>
    </div>
  );
}
