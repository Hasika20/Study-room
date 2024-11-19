import React from "react"
import ChatBot from "./ChatBot"
import VideoCall from "./components/VideoCall"
import Chat from "./components/Chat"
import Whiteboard from "./components/Whiteboard"
// import AIGenerator from './components/AIGenerator';
import "./App.css"
function App() {
	return (
		<div className='App'>
			<h1>Welcome to Live Study Rooms</h1>
			<VideoCall />
			<Chat />
			<ChatBot />
			<Whiteboard />
		</div>
	)
}

export default App
