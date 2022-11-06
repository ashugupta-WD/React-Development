import noteContext from "./noteContext";
import { useState } from 'react'

const NoteState = (props) => {
    const [notesList, setnotesList] = useState([]);
    const [editNoteId, seteditNoteId] = useState(null);

    async function fetchAllNotes() {
        let response;
        try {
            await fetch(`http://localhost:5000/fetchnotes`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(data => response = data);
        } catch (error) {
            console.log(error);
        }
        setnotesList(response);
    }

    async function addNote(e) {
        e.preventDefault();
        const note = document.getElementById('noteForm');
        const formData = new FormData(note);
        const obj = Object.fromEntries(formData.entries());
        obj.timestamp = new Date().getTime();
        let response;
        try {
            await fetch(`http://localhost:5000/addnote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res => res.json()).then(data => response = data);
        } catch (error) {
            console.log(error);
        }
        console.log(response);
        // setnotesList((notesList) => [...notesList, obj])
        fetchAllNotes();
        document.getElementById('noteText').value = '';
        document.getElementById('noteTitle').value = '';
    }

    async function deleteNote(e) {
        let data = { id: (e.target.id).slice(1) }
        // eslint-disable-next-line
        let response;
        try {
            await fetch(`http://localhost:5000/deletenote`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => response = data);
        } catch (error) {
            console.log(error);
        }
        fetchAllNotes();
    }

    function openEditModal(e) {
        let data = (e.target.id).slice(1);
        seteditNoteId(data);
    }

    async function editNote(e) {
        e.preventDefault();
        const note = document.getElementById('editForm');
        const formData = new FormData(note);
        const obj = Object.fromEntries(formData.entries());
        obj.timestamp = new Date().getTime();
        obj.id = editNoteId;
        let response;
        try {
            await fetch(`http://localhost:5000/editnote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res => res.json()).then(data => response = data);
        } catch (error) {
            console.log(error);
        }
        console.log(response);
        document.getElementById('editText').value = '';
        document.getElementById('editTitle').value = '';
        fetchAllNotes();
    }

    return (
        <noteContext.Provider value={{ notesList, editNoteId, fetchAllNotes, deleteNote, editNote, openEditModal, addNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;