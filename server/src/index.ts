import { config } from "./config/env.js"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { initializeSocketHandlers } from "./socket/handlers.js"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: config.clientUrl,
	},
})

app.use(express.json())

initializeSocketHandlers(io)

httpServer.listen(config.port, () => {
	console.log("Server running on port 3000")
})
