import { useState, useRef } from "react";

const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = () => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);

	const liveVideoFeed = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);

	const [recordedVideo, setRecordedVideo] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);

	const getCameraPermission = async () => {
		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		setRecordingStatus("recording");

		const media = new MediaRecorder(stream, { mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localVideoChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
	};

	const stopRecording = () => {
		setPermission(false);
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
		};
	};

	return (
		<div>
			{/* <h2 className="text-xl">Video Recorder</h2> */}
			
				<div className="mb-5">
					{!permission ? (
						<button onClick={getCameraPermission} type="button" className="
						bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
						text-white font-semibold text-sm px-4 py-2 border 
						border-blue-500 rounded-md 
						transition duration-300 ease-in-out focus:outline-none 
						focus:ring-2 focus:ring-blue-400 
						focus:ring-opacity-50" >
							Get Camera
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<div className="flex justify-end mb-10">
						<button onClick={startRecording} type="button" className="
						bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
						text-white font-semibold text-sm px-4 py-2 border 
						border-blue-500 rounded-md 
						transition duration-300 ease-in-out focus:outline-none 
						focus:ring-2 focus:ring-blue-400 
						focus:ring-opacity-50">
							Start 
						</button>
						</div>
					) : null}
					{recordingStatus === "recording" ? (
						<div className="flex justify-end mb-10">
							<button onClick={stopRecording} type="button" className="
						bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
						text-white font-semibold text-sm px-4 py-2 border 
						border-blue-500 rounded-md 
						transition duration-300 ease-in-out focus:outline-none 
						focus:ring-2 focus:ring-blue-400 
						focus:ring-opacity-50
					">
							Stop 
						</button>
						</div>
						
					) : null}
				</div>
		

			<div >
				{!recordedVideo ? (
					<div className="aspect-w-9 aspect-h-16">
					<video ref={liveVideoFeed} autoPlay className="live-player aspect-content object-cover"></video>
				</div>
				
				
				
				) : null}
				{recordedVideo ? (
					<div>
						<video className="recorded" src={recordedVideo} controls></video>
						<a className="bg-black-200 rounded-md p-2 border-grey border-2 "download href={recordedVideo}>
							Download Recording
						</a>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default VideoRecorder;
