import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./routes/home/home"
import Lobby from "./routes/lobby/lobby"
import { SocketProvider } from "./contexts/socket-context"
import Game from "./routes/game/game"
import Results from "./routes/results/results"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SocketProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/lobby/:roomId" element={<Lobby />} />
					<Route path="/game/:roomId" element={<Game />} />
					<Route path="/results/:roomId" element={<Results />} />
				</Routes>
			</BrowserRouter>
		</SocketProvider>
	</StrictMode>
)
