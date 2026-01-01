import { Canvas } from "@react-three/fiber"
import Experience from "@/components/3d/dot-earth/experience"
import LobbyRoom from "@/components/lobby/lobby-room"

export default function Lobby() {
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen">
				<Canvas camera={{ fov: 30, position: [6, 0, 0] }}>
					<Experience />
				</Canvas>
			</div>

			<section className="h-screen flex items-center justify-center bg-black">
				<div className="relative z-20">
					<LobbyRoom />
				</div>
			</section>
		</>
	)
}
