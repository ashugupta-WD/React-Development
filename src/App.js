import './App.css'
import Navbar from './components/Navbar';
import Note from './components/Note';
import NoteState from './context/NoteState';
import { Routes, Route } from 'react-router-dom'


function App() {
    return (
        <>
            <NoteState>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Note />} />
                </Routes>
            </NoteState>
        </>
    );
}

export default App;