import './App.css'
import Navbar from './components/Navbar';
import Note from './components/Note';
import NoteState from './context/NoteState';


function App() {
    return (
        <>
        <NoteState>
            <Navbar/>
            <Note/>
        </NoteState>
        </>
    );
}

export default App;