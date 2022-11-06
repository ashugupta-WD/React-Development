import React, { useContext } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/noteContext'
import { useEffect } from 'react'

export default function Note() {
    const methods = useContext(noteContext);

    useEffect(() => {
        methods.fetchAllNotes();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <form id='noteForm' className="container mb-3">
                <div className="mb-3">
                    <label htmlFor="noteTitle" className="form-label fw-bold fs-5">Title</label>
                    <input id="noteTitle" name='title' className="form-control mb-3" minLength={5} maxLength={20} type="text" placeholder="Title" aria-label="default input example" />
                </div>
                <div className="mb-3">
                    <label htmlFor="noteText" className="form-label fw-bold fs-5">Text</label>
                    <textarea className="form-control" minLength={5} placeholder="Note text here" id="noteText" name='text' rows="5"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e)=>{methods.addNote(e)}}>Add Note</button>
            </form>
            <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id='editForm' className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="editTitle" className="form-label fw-bold fs-5">Edit Title</label>
                                <input id="editTitle" name='title' placeholder='Edit Title here' className="form-control mb-3" minLength={5} maxLength={20} type="text" aria-label="default input example" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editText" className="form-label fw-bold fs-5">Edit Text</label>
                                <textarea className="form-control" placeholder='Edit text here' minLength={5} id="editText" name='text' rows="10"></textarea>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e)=>{methods.editNote(e)}}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-bottom mb-3"></div>
            <div className="mb-5 row px-3" style={{maxWidth: '100%'}}>
                {methods.notesList.length === 0 && <div className="container fw-bold fs-5 mx-3">Nothing to show here</div>}
                {methods.notesList.length > 0 && methods.notesList.map((note, index) => {
                    return (<Noteitem key={index} note={note} />)
                })}
            </div>
        </>
    )
}
