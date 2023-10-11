import { useState, useRef, useEffect } from "react";
import { PiMicrophoneBold } from "react-icons/pi";
const mimeType = "audio/webm";

const AudioRecorder = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [audio, setAudio] = useState(null);

	const [audioChunks, setAudioChunks] = useState([]);
	const [duration, setDuration] = useState(0); // Add this state to keep track of duration

	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
	};
	
	useEffect(() => {
		let timer;
		if (recordingStatus === "recording") {
			timer = setInterval(() => {
				setDuration(prevDuration => prevDuration + 1);
			}, 1000);
		} else {
			clearInterval(timer);
			setDuration(0); // Reset the duration when recording stops or is inactive
		}
		return () => clearInterval(timer); // Clear interval when component unmounts
	}, [recordingStatus]);

	const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioUrl);

			setAudioChunks([]);
		};
	};
	useEffect(()=>{
		getMicrophonePermission();
	},[]);

	return (
		<div className="flex flex-col items-center">
			{/* <h2 className="text-xl">Audio Recorder</h2> */}
			<main>
	<div className="mb-5">
		
		{permission && recordingStatus === "inactive" ? (
			<div className="flex justify-end">

			<button onClick={startRecording} type="button" className="
			bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
			text-white font-semibold text-sm px-4 py-2 border border-blue-500 rounded-md">
				Start 
			</button>
			</div>
			
		) : null}
		{recordingStatus === "recording" ? (
			<div>
			<div className="flex justify-between mb-10">
			<p className="text-md text-red-500">{formatDuration(duration)}</p>
			  <button 
				onClick={stopRecording} 
				type="button" 
				className="
					bg-blue-500 
					hover:bg-blue-600 
					active:bg-blue-700 
					text-white 
					font-semibold 
					text-sm 
					px-4 py-2 
					border 
					border-blue-500 
					rounded-md ">Stop 	</button>
		</div>
		<div className="flex items-center justify-center">
			<button
			  id="speech"
			  className="relative flex items-center justify-center w-24 h-24 text-white text-4xl rounded-full bg-red z-10"
			>
			  <div className="absolute w-full h-full bg-primary border-5 border-primary rounded-full animate-pulsate"></div>
			  <PiMicrophoneBold className="text-white text-3xl z-20" />
			</button>
		  </div>

			</div>
		) : null}
	</div>
	{audio ? (
		<div className="mt-6 flex flex-col items-center">
			<audio className="mb-4" src={audio} controls></audio>
			<a className="rounded-md border-2 bg-blue-500 hover:bg-blue-600 text-white text-md px-4 py-2 m-4" download href={audio} >
				Download 
			</a>
		</div>
		
	) : null}
</main>

		</div>
	);
};

export default AudioRecorder;
