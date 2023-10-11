import { useState, useRef, useEffect } from "react";

import { PiRecordFill } from "react-icons/pi";
const mimeType = 'video/webm; codecs="opus,vp8"';

const VideoRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
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
	
    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
                const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
                setPermission(true);
                const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioStream.getAudioTracks()]);
                setStream(combinedStream);
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    useEffect(() => {
        // Automatically request camera permission when component is mounted
        getCameraPermission();
    }, []);

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
			
            <div className="mb-5">
                {permission && recordingStatus === "inactive" && (
                    <div className="flex justify-end mb-10">
                        <button onClick={startRecording} type="button" className="
			bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
			text-white text-sm px-4 py-2 border border-blue-500 rounded-md 
			">Start</button>
                    </div>
                )}
                {recordingStatus === "recording" && (
                    <div className="flex justify-between mb-10">

						<p className="text-md text-red-500">{formatDuration(duration)}</p>

					
					<button onClick={stopRecording} type="button" className="
			bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
			text-white  text-sm px-4 py-2 border border-blue-500 rounded-md">
						Stop
					</button>
				</div>
                )}
            </div>

            <div>
                {!recordedVideo ? (
                    <div className="aspect-w-9 aspect-h-16">
                        <video ref={liveVideoFeed} autoPlay className="live-player aspect-content object-cover"></video>
                    </div>
                ) : null}
                {recordedVideo && (
                    <div className="mt-4 flex flex-col items-center">
					<video className="recorded mb-4" src={recordedVideo} controls></video>
					<a className="rounded-md border-2 bg-blue-500 hover:bg-blue-600 text-white text-md px-4 py-2 m-4" download href={recordedVideo}>
						Download 
					</a>
				</div>
				
                )}
            </div>
        </div>
    );
};

export default VideoRecorder;
