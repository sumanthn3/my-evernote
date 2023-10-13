import React, { useState } from "react";
import NotesGrid from "./NotesGrid";
import NotesCarousel from "./NotesCarousel";
import { useDispatch, useSelector } from "react-redux";
function MyNotes() {
  const [view, setView] = useState("grid"); // or 'carousel'
  const [filter, setFilter] = useState("all"); // e.g., 'all', 'audio', 'video', 'text'

  // Mock notes data:
  const notes = useSelector((store) => store.notes);
  console.log(notes);
  //   const notes = [
  //     {
  //       id: 1,
  //       type: "text",
  //       content: "This is a sample text note. Write your content here!"
  //     },
  //     {
  //       id: 2,
  //       type: "audio",
  //       url: "path_to_audio_file.mp3"
  //     },
  //     {
  //       id: 3,
  //       type: "video",
  //       url: "path_to_video_file.mp4"
  //     },
  //     // ... add more
  //   ];
  const filteredNotes = notes.filter(
    (note) => filter === "all" || note.type === filter
  );

  return (
    <div className="w-full h-full bg-white p-4 md:p-8">
      <div className="w-full flex flex-row justify-between  p-6 md:p-8 ">
        <div>
          <h1 className="text-3xl md:text-3xl font-bold border-l-2 border-blue-500 p-1 text-gray-700">
            My Notes
          </h1>
        </div>

        <div className="flex flex-row">
          <button
            onClick={() => setView(view === "grid" ? "carousel" : "grid")}
            className="focus:outline-none px-4 py-2 text-sm md:text-base font-medium border border-blue-500 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {view === "grid" ? "Carousel" : "Grid"}
          </button>

          {/* Filter */}
          <div className="flex items-center ml-4 border border-gray-300 rounded-md">
            <label
              htmlFor="filter"
              className="pl-2 pr-3 text-sm md:text-base text-gray-700rounded-l-md"
            >
              Filter:
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-2 pr-3 py-1 text-gray-700 bg-white rounded-r-md"
              id="filter"
            >
              <option value="all">All</option>
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {view === "grid" ? (
          <NotesGrid notes={filteredNotes} />
        ) : (
          <NotesCarousel notes={filteredNotes} />
        )}
      </div>
    </div>
  );
}

export default MyNotes;
