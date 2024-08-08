import React, { forwardRef } from "react";

const Note = forwardRef(({ content, initialPos, onDelete, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        backgroundColor: "lightyellow",
        padding: "10px",
        borderRadius: "5px",
        width: "200px",
        cursor: "move",
      }}
      {...props}
    >
      <div>
        📌 {content}
        <button
          onClick={onDelete}
          style={{ float: "right", cursor: "pointer" }}
        >
          X
        </button>
      </div>
    </div>
  );
});

export default Note;
