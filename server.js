// Node version should be >= 18
// Install dependencies: npm install @google/generative-ai express dotenv

const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const dotenv = require("dotenv").config()
const app = express()
const http = require("http")
const { Server } = http.createServer(app)
const port = process.env.PORT || 3000
app.use(express.json())

const io = new Server(server)

io.on("connection", (socket) => {
	console.log("A user connected")

	// Handle drawing events
	socket.on("drawing", (data) => {
		// Broadcast the drawing data to other connected users
		socket.broadcast.emit("drawing", data)
	})

	socket.on("disconnect", () => {
		console.log("User disconnected")
	})
})

const MODEL_NAME = "gemini-pro"
const API_KEY = process.env.API_KEY

const MODEL_NAME = "gemini-pro" // Replace with the desired Gemini model name
const API_KEY = process.env.API_KEY

async function runChat(userInput) {
	// Initialize the Google Generative AI client
	const genAI = new GoogleGenerativeAI(API_KEY)

	// Configure the request for the Gemini model
	const response = await genAI.generateText({
		model: MODEL_NAME,
		prompt: userInput, // Directly use user input as the prompt
		temperature: 0.9, // Adjust for randomness in responses
		maxOutputTokens: 1000, // Limit the output length
	})

	return response?.text || "No response generated."
}

// Route to serve the chat interface
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

// API route to handle chat input
app.post("/chat", async (req, res) => {
	try {
		const userInput = req.body?.userInput

		if (!userInput) {
			return res.status(400).json({ error: "Invalid request body" })
		}

		// Call the AI model with the user's input
		const response = await runChat(userInput)
		res.json({ response })
	} catch (error) {
		console.error("Error processing chat request:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Start the server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
