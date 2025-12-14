import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./routes/home/home"
import Lobby from "./routes/lobby/lobby"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/lobby" element={<Lobby />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
