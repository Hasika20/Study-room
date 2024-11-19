import React, { useState } from "react"

function Chatbot() {
	const [chatHistory, setChatHistory] = useState([])
	const [userInput, setUserInput] = useState("")
	const [loading, setLoading] = useState(false)

	const sendMessage = async () => {
		setLoading(true)
		try {
			const response = await fetch("/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userInput }),
			})
			const data = await response.json()
			setChatHistory([...chatHistory, { user: userInput, bot: data.response }])
			setUserInput("")
		} catch (error) {
			console.error("Error:", error)
		}
		setLoading(false)
	}

	return (
		<div
			style={{
				fontFamily: "sans-serif",
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#f0f0f0",
			}}
		>
			<div
				style={{
					backgroundColor: "#fff",
					borderRadius: "10px",
					padding: "20px",
					boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
					width: "400px",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Coding Money Chatbot</h1>
				<div
					style={{ height: "300px", overflowY: "scroll", marginBottom: "20px" }}
				>
					{chatHistory.map((message, index) => (
						<div key={index}>
							<div
								style={{
									textAlign: "right",
									padding: "10px",
									backgroundColor: "#f0f0f0",
									borderRadius: "10px",
									marginBottom: "5px",
								}}
							>
								{message.user}
							</div>
							<div
								style={{
									textAlign: "left",
									padding: "10px",
									backgroundColor: "#e0f0e0",
									borderRadius: "10px",
									marginBottom: "5px",
								}}
							>
								{message.bot}
							</div>
						</div>
					))}
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						sendMessage()
					}}
					style={{ display: "flex" }}
				>
					<input
						type='text'
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						placeholder='Enter your message'
						style={{
							flexGrow: 1,
							marginRight: "10px",
							padding: "10px",
							border: "1px solid #ccc",
							borderRadius: "5px",
						}}
					/>
					<button
						type='submit'
						style={{
							backgroundColor: "#4CAF50",
							color: "white",
							border: "none",
							padding: "10px 15px",
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						Send
					</button>
				</form>
				{loading && (
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<img src='loader.gif' width='150px' alt='Loading...' />
					</div>
				)}
			</div>
		</div>
	)
}

export default Chatbot
