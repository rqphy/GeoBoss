import { Link } from "react-router"
import GlobeViewer from "@/components/3d/game-earth/globe-viewer"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Hud from "@/components/hud/hud"

export default function Lobby() {
	return (
		<>
			<h1>Lobby</h1>
			<Link to="/">Home</Link>
			<div className="absolute top-0 left-0 w-full h-screen bg-[#012a4a]">
				<Canvas camera={{ position: [0, 60, 80] }}>
					<ambientLight intensity={1.8} />
					<GlobeViewer />
					<OrbitControls />
				</Canvas>
			</div>
			<Hud />
		</>
	)
}
