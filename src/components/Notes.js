import React, { useState } from "react";
import VideoRecorder from "../components/VideoRecorder";
import AudioRecorder from "../components/AudioRecorder";
import SpeechToText from "../components/SpeechToText";

import CreateNotesImg from "../UI/CreateNotesImg";

const Notes = () => {
  let [recordOption, setRecordOption] = useState("speechToText");

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };

  return (
    <div className="w-full h-full flex flex-col justify-between md:flex-row bg-white p-4 md:p-8">
      {/* Left Section */}
      <div className="md:w-1/2 bg-white rounded-xl p-6 md:p-8 shadow-lg mb-4 md:mb-0">
        <h1 className="text-3xl md:text-3xl font-bold border-l-2 border-blue-500 p-1 text-gray-700 mb-8">
          Create Note
        </h1>

        <div className="grid grid-cols-3 items-center gap-4 mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium text-md rounded-lg p-2 px-4 transition duration-300"
            onClick={toggleRecordOption("speechToText")}
          >
            Text
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium text-md rounded-lg p-2 px-4 transition duration-300"
            onClick={toggleRecordOption("audio")}
          >
            Audio
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-md rounded-lg p-2 px-4 transition duration-300"
            onClick={toggleRecordOption("video")}
          >
            Video
          </button>
        </div>

        <div className="w-full bg-gray-100 rounded-lg p-6 shadow-md">
          {(() => {
            switch (recordOption) {
              case "video":
                return <VideoRecorder />;
              case "audio":
                return <AudioRecorder />;
              case "speechToText":
                return <SpeechToText />;
              default:
                return (
                  <p className="text-center text-gray-500">
                    Please select an option to proceed.
                  </p>
                );
            }
          })()}
        </div>
      </div>

      <div className="flex items-center w-full md:w-1/2 mt-4 md:mt-0">
        <CreateNotesImg className="w-full h-auto object-cover rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

export default Notes;
