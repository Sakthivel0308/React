import React, { useEffect, useRef, createRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const noteRefs = useRef({});

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updateNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });
    setNotes(updateNotes);
    localStorage.setItem("notes", JSON.stringify(updateNotes));
  }, []);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note, e) => {
    const { id } = note;
    if (!noteRefs.current[id]) return;
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      if (checkForOverlap(id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotesPosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentNoteRef = noteRefs.current[id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;
      const otherNoteRef = noteRefs.current[note.id].current;
      const otherRect = otherNoteRef.getBoundingClientRect();
      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.top > otherRect.bottom ||
        currentRect.bottom < otherRect.top
      );
      return overlap;
    });
  };

  const updateNotesPosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef())
          }
          initialPos={note.position}
          content={note.text}
          onMouseDown={(e) => handleDragStart(note, e)}
          onDelete={() => handleDeleteNote(note.id)}
        />
      ))}
    </div>
  );
};

export default Notes;
