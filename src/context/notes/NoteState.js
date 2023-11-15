import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const baseUrl = "http://localhost:5000"
    const NoteInitial = []
    const [notes, setNotes] = useState(NoteInitial);

    const getNote = async ()=>{
        const response = await fetch(`${baseUrl}/api/notes/getnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk1NTk0NWVjM2U0YWVkNjFjN2JjIn0sImlhdCI6MTY5NDQ4MzA5N30.rhrnzzmY-S9MHMoGRdxIL2h0F9p0Oj5qOwbHNiU1ekY",
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${baseUrl}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk1NTk0NWVjM2U0YWVkNjFjN2JjIn0sImlhdCI6MTY5NDQ4MzA5N30.rhrnzzmY-S9MHMoGRdxIL2h0F9p0Oj5qOwbHNiU1ekY",
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        console.log(json);

        setNotes(notes.concat(json));
    }
    const deleteNote = async(id)=>{
        const response = await fetch(`${baseUrl}/api/notes/deletenotes/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk1NTk0NWVjM2U0YWVkNjFjN2JjIn0sImlhdCI6MTY5NDQ4MzA5N30.rhrnzzmY-S9MHMoGRdxIL2h0F9p0Oj5qOwbHNiU1ekY",
            },
            body: JSON.stringify({}),
        });
        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    const editNote = async(id,title, description, tag)=>{
        const response = await fetch(`${baseUrl}/api/notes/updatenotes/` + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmZTk1NTk0NWVjM2U0YWVkNjFjN2JjIn0sImlhdCI6MTY5NDQ4MzA5N30.rhrnzzmY-S9MHMoGRdxIL2h0F9p0Oj5qOwbHNiU1ekY",
            },
            body: JSON.stringify({title, description, tag}),
            });
            const json = await response.json();
            console.log(json);
    }
    return (
        <NoteContext.Provider value={{notes, setNotes, getNote, addNote, deleteNote, editNote}}>
            {props.children}
         </NoteContext.Provider>
    )
}
 
export default NoteState;