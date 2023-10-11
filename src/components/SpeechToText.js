import React, { useState, useEffect } from "react";
import { PiMicrophoneBold } from "react-icons/pi";
import TextareaAutosize from "react-textarea-autosize";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();
mic.continuous = true; // <-- make sure it's 'continuous'
mic.interimResults = true;

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");

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
          rounded-md 
          transition 
          duration-300 
          ease-in-out 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-400 
          focus:ring-opacity-50"
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
            // <div className="relative p-5">
            //   <div className="w-10 h-10 bg-blue-500 border-5 border-blue rounded-full absolute -top-5 -left-5 animate-pulsate"></div>
            //   <PiMicrophoneBold className="text-white text-xl" />
            // </div>
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

      <div className="flex items-center my-2">
        <TextareaAutosize
          value={note}
          className="w-80 border-black bg-gray-200 rounded-lg p-2"
        />
      </div>
    </div>
  );
};

export default SpeechToText;
