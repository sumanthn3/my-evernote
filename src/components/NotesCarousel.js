import React from "react";
import { Carousel } from "react-responsive-carousel";

function NotesCarousel({ notes }) {
  return (
    <Carousel
      showThumbs={false}
      dynamicHeight={true}
      useKeyboardArrows={true}
      showStatus={false}
      className="md:max-w-3xl mx-auto"
    >
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md"
        >
          {note.type === "text" && (
            <div className="w-full text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-gray-700 mb-4">
                {note.title}
              </p>
              <p className="text-gray-600">{note.content}</p>
            </div>
          )}

          {note.type === "audio" && (
            <div className="w-full">
              <p className="text-lg md:text-xl font-medium text-gray-700 mb-4">
                Audio Note
              </p>
              <audio controls className="w-full">
                <source src={note.url} type="audio/mp3" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          )}

          {note.type === "video" && (
            <div className="w-full aspect-w-16 aspect-h-9">
              <p className="text-lg md:text-xl font-medium text-gray-700 mb-4">
                Video Note
              </p>
              <video controls className="aspect-content">
                <source src={note.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
}

export default NotesCarousel;
