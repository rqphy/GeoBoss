import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./routes/home/home"
import Lobby from "./routes/lobby/lobby"
import { SocketProvider } from "./contexts/socket-context"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SocketProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/lobby/:roomId" element={<Lobby />} />
				</Routes>
			</BrowserRouter>
		</SocketProvider>
	</StrictMode>
)
