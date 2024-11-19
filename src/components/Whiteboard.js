// src/Whiteboard.js
import React, { useEffect } from "react"

const Whiteboard = () => {
	useEffect(() => {
		const domain = "meet.jit.si"
		const options = {
			roomName: "Vennela", // Use a unique room name for each session
			width: "100%",
			height: "600px",
			parentNode: document.querySelector("#whiteboard-container"),
			interfaceConfigOverwrite: {
				// Customize your interface if needed
			},
			configOverwrite: {
				// Customize your config if needed
			},
		}

		const api = new window.JitsiMeetExternalAPI(domain, options)

		return () => {
			api.dispose() // Cleanup on component unmount
		}
	}, [])

	return (
		<div>
			<h2>Live Study Room</h2>
			<div
				id='whiteboard-container'
				style={{ width: "100%", height: "600px" }}
			/>
		</div>
	)
}

export default Whiteboard
