import React, { useState } from "react";
import NotesGrid from "../components/NotesGrid";
import NotesCarousel from "../components/NotesCarousel";

function MyNotes() {
  const [view, setView] = useState("grid"); // or 'carousel'
  const [filter, setFilter] = useState("all"); // e.g., 'all', 'audio', 'video', 'text'

  // Mock notes data:
  const notes = [
    { id: 1, type: "text" },
    { id: 2, type: "audio" },
    { id: 3, type: "video" },
    // ... add more
  ];

  const filteredNotes = notes.filter(
    (note) => filter === "all" || note.type === filter
  );

  return (
    <div>
      <div className="w-full flex md:flex-row justify-between py-4 md:py-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          My Notes
        </h2>

        <div className="flex items-center space-x-4 md:space-x-6">
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
              className="pl-2 pr-3 py-1 text-sm md:text-base text-gray-700 bg-gray-200 rounded-l-md"
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
