import React, { useEffect } from "react"

const VideoCall = () => {
	const roomName = "your-custom-room-name"

	useEffect(() => {
		const domain = "meet.jit.si"
		const options = {
			roomName: roomName,
			width: "100%",
			height: 600,
			parentNode: document.getElementById("jitsi-container"),
			interfaceConfigOverwrite: {
				SHOW_JITSI_WATERMARK: false,
				SHOW_BRAND_WATERMARK: false,
				SHOW_WATERMARK_FOR_GUESTS: false,
				TOOLBAR_BUTTONS: [
					"microphone",
					"camera",
					"chat",
					"desktop",
					"fullscreen",
					"hangup",
					"raisehand",
					"videoquality",
					"tileview",
				],
			},
		}
		const generateMeetingLink = () => {
			const roomId = Math.random().toString(36).substring(2, 7) // Generate random room ID
			const meetingLink = `${window.location.origin}/room/${roomId}`
			navigator.clipboard.writeText(meetingLink) // Copy to clipboard
			alert(`Meeting link copied: ${meetingLink}`)
		}
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				// Handle stream
			})
			.catch((error) => {
				console.error("Error accessing media devices.", error)
			})

		const api = new window.JitsiMeetExternalAPI(domain, options)

		return () => {
			api.dispose() // Clean up when component unmounts
		}
	}, [])

	return (
		<div>
			<h1>Live Study Room Video Call</h1>
			<div id='jitsi-container'></div>
		</div>
	)
}

export default VideoCall
