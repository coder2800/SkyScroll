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
                "auth-token": localStorage.getItem("token"),
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
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        setNotes(notes.concat(json));
    }
    const deleteNote = async(id)=>{
        const response = await fetch(`${baseUrl}/api/notes/deletenotes/` + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
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
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({title, description, tag}),
            });
            const json = await response.json();
            console.log(json)
            let newNotes = JSON.parse(JSON.stringify(notes))
            for(let index=0;index<notes.length;index++){
                if(newNotes[index]._id===id){
                    newNotes[index].title = title
                    newNotes[index].description = description
                    newNotes[index].tag = tag
                }
            }
            setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes, setNotes, getNote, addNote, deleteNote, editNote}}>
            {props.children}
         </NoteContext.Provider>
    )
}
 
export default NoteState;