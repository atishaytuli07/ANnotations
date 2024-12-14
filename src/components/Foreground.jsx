import React, { useState, useEffect, useRef } from 'react';
import Cards from './Cards';

function Foreground() {
  const [notes, setNotes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const defaultCard = {
      id: "default-card",
      des: "Welcome to the Docs App! 🎉\n\nInstructions:\n1. Tap anywhere on the screen to create a new note.\n2. Drag notes around to rearrange.\n3. Tap the document icon (top left) to change note color.\n4. Use the - icon to remove a note.\n5. Tap the download icon to save your note as a .txt file. \n\n We can also Change Notes Heading 'New Notes' \nEnjoy Note Making !!\n -annotations",
      position: { x: 50, y: 50 },
      tagdetails: { isOpen: false, tagTitle: "Instructions" }
    };
    setNotes([defaultCard]);
  }, []);

  const handleAddNote = (e) => {
    if (!e.target.closest('.card-container')) {
      // Get container bounds
      const container = containerRef.current;
      const containerBounds = container.getBoundingClientRect();

      // Card dimensions based on the actual rendered sizes
      const cardWidth = window.innerWidth < 768 ? 192 : 240;  // w-48/w-60
      const cardHeight = window.innerWidth < 768 ? 256 : 320; // h-64/h-80

      // Calculate available space
      const maxX = containerBounds.width - cardWidth;
      const maxY = containerBounds.height - cardHeight;

      // Get click position relative to container
      const relativeX = e.clientX - containerBounds.left;
      const relativeY = e.clientY - containerBounds.top;

      // Ensure position stays within container bounds
      const xPos = Math.max(0, Math.min(relativeX, maxX));
      const yPos = Math.max(0, Math.min(relativeY, maxY));

      // Create new note with bounded position
      const newNote = {
        id: Date.now(),
        des: "",
        position: { 
          x: Math.round(xPos), 
          y: Math.round(yPos)
        },
        tagdetails: { isOpen: true, tagTitle: "New Note" }
      };

      setNotes(prevNotes => [...prevNotes, newNote]);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handleAddNote(e)}
      className="fixed z-[3] top-0 left-0 w-full h-full p-5 flex gap-4 flex-wrap overflow-hidden"
    >
      {notes.map((note) => (
        <Cards
          key={note.id}
          data={note}
          setNotes={setNotes}
          isDefault={note.id === "default-card"}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

export default Foreground;
