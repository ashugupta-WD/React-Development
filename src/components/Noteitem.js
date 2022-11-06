import React, { useContext } from 'react'
import noteContext from '../context/noteContext';

export default function Noteitem(props) {
    const methods = useContext(noteContext);
    const { _id, title, text, timestamp } = props.note;
    function getTimeDifference(time) {
        let timeDiff = Math.floor((new Date().getTime() - time) / 1000);
        if (timeDiff < 1) {
            return 'Just now';
        }
        else if (timeDiff < 60) {
            return (timeDiff + " Sec Ago");
        }
        else if (timeDiff < 3600) {
            return (Math.floor((timeDiff / 60)) + " Min Ago");
        }
        else if (timeDiff < (3600 * 24)) {
            return (Math.floor((timeDiff / 3600)) + " Hr Ago");
        }
        else {
            let str = new Date(time);
            str = (str.toDateString());
            return str;
        }
    }

    return (
        <>
            <div className= 'col-12 col-sm-6 col-md-4 col-xl-3'>
                <div className="card mx-2 mb-4" style={{ padding: '0' }}>
                    <img src="https://images.unsplash.com/photo-1588189839901-297c92fca7ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw5ODMyMjc3fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="card-img img.fluid" alt="Note Card Background" style={{ filter: "blur(2px)", height: '200px' }} />
                    <div className="card-img-overlay d-flex flex-column align-items-center" style={{ height: '150px' }}>
                        <span className="align-self-end d-flex">
                            <button id={'d' + _id} className="btn btn-danger me-2" onClick={(e) => { methods.deleteNote(e) }}>Delete</button>
                            <button id={'e' + _id} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editModal" onClick={(e) => { methods.openEditModal(e); }}>Edit</button>
                        </span>
                        <h3 className="card-title text-white mt-2">{title}</h3>
                    </div>
                    <div className="card-body border-top overflow-auto myscroll" style={{ height: '200px' }}>
                        <p className="card-text p-2">{text}</p>
                    </div>
                    <div className="card-footer text-center">
                        <small className="text-muted">{getTimeDifference(timestamp)}</small>
                    </div>
                </div>
            </div>
        </>
    )
}
