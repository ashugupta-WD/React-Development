import noteContext from "./noteContext";
import { useState } from 'react'

const NoteState = (props) => {
    const [notesList, setnotesList] = useState([]);
    const [editNoteId, seteditNoteId] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [alertMessage, setalertMessage] = useState(null);

    async function fetchAllNotes() {
        setisLoading(true);
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
        setisLoading(false);
        setnotesList(response);
    }

    async function addNote(e) {
        e.preventDefault();
        setisLoading(true);
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
        setalertMessage(response.msg);
        setTimeout(() => {
            setalertMessage(null);
        }, 1500);
        fetchAllNotes();
        document.getElementById('noteText').value = '';
        document.getElementById('noteTitle').value = '';
    }

    async function deleteNote(e) {
        setisLoading(true);
        let data = { id: (e.target.id).slice(1) }
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
        setalertMessage(response.msg);
        setTimeout(() => {
            setalertMessage(null);
        }, 1500);
        fetchAllNotes();
    }

    function openEditModal(e) {
        let data = (e.target.id).slice(1);
        seteditNoteId(data);
    }

    async function editNote(e) {
        e.preventDefault();
        setisLoading(true);
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
        setalertMessage(response.msg);
        setTimeout(() => {
            setalertMessage(null);
        }, 1500);
        document.getElementById('editText').value = '';
        document.getElementById('editTitle').value = '';
        fetchAllNotes();
    }

    return (
        <noteContext.Provider value={{ notesList, editNoteId, isLoading, alertMessage, fetchAllNotes, deleteNote, editNote, openEditModal, addNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;