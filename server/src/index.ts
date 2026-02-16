import { config } from "./config/env.js"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { initializeSocketHandlers } from "./socket/handlers.js"
import apiRoutes from "./routes/api.js"
import cors from "cors"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: config.nodeEnv === "development" ? "*" : config.clientUrl,
		credentials: true,
	},
})

app.use(cors())
app.use(express.json())

app.use("/api", apiRoutes)

initializeSocketHandlers(io)

const PORT = config.port || 3000
const HOST = "0.0.0.0"
httpServer.listen(PORT, HOST, () => {
	console.log(`Server running on ${HOST}:${PORT}`)
})
