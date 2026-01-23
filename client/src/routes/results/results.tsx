import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import PodiumBar from "@/components/results/podium-bar"
import FinalScoreboard from "@/components/results/final-scoreboard"
import { useSocket } from "@/contexts/socket-context"

export default function Results() {
	const navigate = useNavigate()
	const { gameResults, roomId } = useSocket()

	const [first, second, third, ...rest] = gameResults || []

	function restartGame() {
		navigate(`/lobby/${roomId}`)
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 bg-[#012a4a]">
			<h1 className="text-4xl font-black text-secondary">🏆 Résultats</h1>

			<div className="flex items-end gap-4">
				<PodiumBar player={second} position={2} />
				<PodiumBar player={first} position={1} />
				<PodiumBar player={third} position={3} />
			</div>

			<FinalScoreboard players={rest} />

			<Button onClick={restartGame}>
				Rejouer
			</Button>
		</div>
	)
}
