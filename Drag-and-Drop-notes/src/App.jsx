import { useState } from "react";
import "./App.css";
import Notes from "./components/Notes";

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "check description",
      position: { x: 100, y: 100 },
    },
    {
      id: 2,
      text: "check title",
      position: { x: 200, y: 200 },
    },
  ]);

  const handleChange = (e) => {
    e.preventDefault();
    const currentNote = {
      id: notes.length + 1,
      text: newNote,
      position: { x: 0, y: 0 },
    };
    setNotes([...notes, currentNote]);
    setNewNote("");
  };

  return (
    <div>
      <div className="input-box">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleChange}>Add Note</button>
      </div>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
