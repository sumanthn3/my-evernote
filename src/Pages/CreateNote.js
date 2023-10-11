import React, { useState } from "react";
import VideoRecorder from "../components/VideoRecorder";
import AudioRecorder from "../components/AudioRecorder";
const CreateNote = () => {
  let [recordOption, setRecordOption] = useState("video");

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type);
    };
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Create Note</h1>
      <div className="flex space-x-8 p-2">
        <button
          className="bg-blue-200 rounded-md p-2 border-grey border-2 "
          onClick={toggleRecordOption("video")}
        >
          Record Video
        </button>
        <button
          className="bg-red-200 rounded-md p-2 border-grey border-2 "
          onClick={toggleRecordOption("audio")}
        >
          Record Audio
        </button>
      </div>
      <div>
        {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
      </div>
    </div>
  );
};

export default CreateNote;
