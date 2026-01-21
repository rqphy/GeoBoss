import { Link } from "react-router"
import GlobeViewer from "@/components/3d/game-earth/globe-viewer"
import { Canvas } from "@react-three/fiber"
import Hud from "@/components/hud/hud"
import { useSocket } from "@/contexts/socket-context"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function Lobby() {
	const navigate = useNavigate()
	const { currentRound, gameResults, roomId } = useSocket()

	useEffect(() => {
		if (gameResults) {
			navigate(`/results/${roomId}`)
		}
	}, [gameResults])

	if (!currentRound) {
		return <div>Game not started</div>
	}

	return (
		<>
			<div className="relative">
				<Link to="/">Home</Link>
				<div className="absolute top-0 left-0 w-full h-screen bg-[#012a4a]">
					<Canvas camera={{ position: [0, 0, 90] }}>
						<ambientLight intensity={1.8} />
						<GlobeViewer />
					</Canvas>
				</div>
				<Hud />
			</div>
		</>
	)
}
