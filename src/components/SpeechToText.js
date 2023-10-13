import React, { useState, useEffect, useRef } from "react";
import { PiMicrophoneBold } from "react-icons/pi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { addNote } from "../utils/notesSlice";
import { Navigate, useNavigate } from "react-router-dom";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();
mic.continuous = true; // <-- make sure it's 'continuous'
mic.interimResults = true;

const SpeechToText = () => {
  const navigate = useNavigate();
  const title = useRef(null);
  const onSaveNote = () => {
    console.log("Form values", title);
    dispatch(
      addNote({
        id: Date.now(),
        type: "text",
        title: title.current.value,
        note: note,
      })
    );
    navigate("/Home/mynotes");
  };
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setNote(value);
  };

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onstart = () => {
        console.log("mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((res) => res[0])
          .map((res) => res.transcript)
          .join("");
        console.log(event.results);
        setNote(transcript);
      };

      mic.onerror = (event) => {
        console.log(event.error);
      };
    } else {
      mic.stop();
      console.log("STOPped mic on click");
    }
  };

  return (
    <div>
      <div className="flex justify-end my-2">
        <button
          className="bg-blue-500 
          hover:bg-blue-600 
          active:bg-blue-700 
          text-white 
          font-semibold 
          text-sm 
          px-4 py-2 
          border 
          border-blue-500 
          rounded-md "
          onClick={() => {
            setIsListening((prevState) => !prevState);
          }}
        >
          {!isListening ? "🎤 Start" : "🛑 Stop"}
        </button>
      </div>
      <div>
        <h2>
          {isListening && (
            <div className="flex items-center mb-10 justify-center">
              <button
                id="speech"
                className="relative flex items-center justify-center w-24 h-24 text-white text-4xl rounded-full bg-red z-10"
              >
                <div className="absolute w-full h-full bg-primary border-5 border-primary rounded-full animate-pulsate"></div>
                <PiMicrophoneBold className="text-white text-3xl z-20" />
              </button>
            </div>
          )}
        </h2>
      </div>
      <input
        ref={title}
        type="text"
        placeholder="Enter Title"
        className="p-4 my-4 w-full bg-white rounded-lg"
      />
      <div className="flex items-center my-2">
        <ReactQuill
          className="w-full bg-white rounded-lg"
          value={note}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onSaveNote}
      >
        Save
      </button>
    </div>
  );
};

export default SpeechToText;
