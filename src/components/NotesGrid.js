import React from "react";
import RichTextEditor from "./ReactTextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function NotesGrid({ notes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {notes.map((note) => (
        <div key={note.id} className="border rounded p-4 shadow-md">
          <h1 className="font-bold p-2">{note.title}</h1>
          {note.type === "text" && <ReactQuill value={note.note} />}

          {note.type === "audio" && (
            <div>
              {/* <p className="text-gray-600">Audio Note:</p> */}
              <audio controls className="w-full mt-2">
                <source src={note.note} type="audio/mp3" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}

          {note.type === "video" && (
            <div>
              {/* <p className="text-gray-600">Video Note:</p> */}
              <video controls className="w-full mt-2">
                <source src={note.note} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default NotesGrid;
