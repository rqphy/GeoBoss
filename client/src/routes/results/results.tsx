import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import Experience from "@/components/3d/dot-earth/experience"
import PodiumBar from "@/components/results/podium-bar"
import FinalScoreboard from "@/components/results/final-scoreboard"
import { useSocket } from "@/contexts/socket-context"
import type { Player } from "@/types/game"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card"

// colors
// "#FF5733", // Red-Orange
// "#33FF57", // Green
// "#3357FF", // Blue
// "#F333FF", // Magenta
// "#FFD700", // Gold
// "#FF1493", // Deep Pink
// "#00CED1", // Dark Turquoise
// "#FF8C00", // Dark Orange

const fakeGameResults = [
	{
		id: "1",
		name: "Raphael",
		score: 1859,
		color: "#FF5733",
	},
	{
		id: "2",
		name: "John",
		score: 1234,
		color: "#33FF57",
	},
	{
		id: "3",
		name: "Jane",
		score: 934,
		color: "#3357FF",
	},
	{
		id: "4",
		name: "Bob",
		score: 423,
		color: "#FFD700",
	},
	{
		id: "5",
		name: "Alice",
		score: 123,
		color: "#FF8C00",
	},
] as Player[]

export default function Results() {
	const navigate = useNavigate()
	const { gameResults, roomId } = useSocket()

	const [first, second, third, ...rest] = fakeGameResults || []

	function restartGame() {
		navigate(`/lobby/${roomId}`)
	}

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen">
				<Canvas camera={{ fov: 30, position: [6, 0, 0] }}>
					<Experience />
				</Canvas>
			</div>

			<section className="h-screen flex items-center justify-center bg-black">
				<div className="min-h-screen flex flex-col items-center justify-center relative z-20">
					<Card className="bg-secondary/5 border-secondary/20 backdrop-blur-sm">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl text-secondary">
								🏆 Résultats
							</CardTitle>
						</CardHeader>
						<CardDescription className="px-4">
							<div className="flex items-end gap-4 mb-4">
								<PodiumBar player={second} position={2} />
								<PodiumBar player={first} position={1} />
								<PodiumBar player={third} position={3} />
							</div>
							<div className="">
								{rest.map((player, index) => (
									<div
										key={player.id}
										className="flex items-center justify-between py-2 px-3 bg-secondary/20 rounded-lg mb-2 text-secondary"
									>
										<div className="flex items-center gap-3">
											<span className="font-medium w-6">
												{index + 4}.
											</span>
											<span
												className="font-medium"
												style={{ color: player.color }}
											>
												{player.name}
											</span>
										</div>
										<span>{player.score} pts</span>
									</div>
								))}
							</div>
						</CardDescription>
					</Card>

					<Button
						onClick={restartGame}
						variant="secondary"
						className="hover:cursor-pointer mt-6"
					>
						Rejouer
					</Button>
				</div>
			</section>
		</>
	)
}
