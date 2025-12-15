import { Link } from "react-router"
import GlobeViewer from "@/components/3d/game-earth/globe-viewer"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

export default function Lobby() {
	return (
		<>
			<h1>Lobby</h1>
			<Link to="/">Home</Link>
			<div className="absolute top-0 left-0 w-full h-screen">
				<Canvas camera={{ position: [0, 0, 100] }}>
					<ambientLight />
					<directionalLight position={[1, 1, 1]} />
					<GlobeViewer />
					<OrbitControls />
				</Canvas>
			</div>
		</>
	)
}
