import React, { useState } from "react"
import axios from "axios" // For making API requests

const Chat = () => {
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleSendMessage = async () => {
		if (newMessage.trim() !== "") {
			const userMessage = { text: newMessage, sender: "You" }
			setMessages([...messages, userMessage])
			setNewMessage("")

			// Make API call to AI (Generative AI model like GPT)
			try {
				setIsLoading(true)
				const response = await axios.post(
					"https://api.openai.com/v1/completions",
					{
						prompt: newMessage,
						model: "text-davinci-003", // Adjust based on the AI model you use
						max_tokens: 150,
					},
					{
						headers: {
							Authorization: `Bearer API_KEY`,
						},
					}
				)

				const aiMessage = { text: response.data.choices[0].text, sender: "AI" }
				setMessages((prevMessages) => [...prevMessages, aiMessage])
			} catch (error) {
				console.error("Error in generating AI response:", error)
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<div className='chat-container'>
			<div className='chat-box'>
				{messages.map((message, index) => (
					<div key={index} className='chat-message'>
						<strong>{message.sender}:</strong> {message.text}
					</div>
				))}
			</div>
			<input
				type='text'
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
				placeholder='Type your message'
			/>
			<button onClick={handleSendMessage} disabled={isLoading}>
				{isLoading ? "Generating..." : "Send"}
			</button>
		</div>
	)
}

export default Chat
