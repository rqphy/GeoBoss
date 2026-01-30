import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import Experience from "@/components/3d/dot-earth/experience"
import PodiumBar from "@/components/results/podium-bar"
import { useSocket } from "@/contexts/socket-context"
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card"

export default function Results() {
	const navigate = useNavigate()
	const { gameResults, roomId, leaveRoom } = useSocket()

	const [first, second, third, ...rest] = gameResults || []

	function restartGame() {
		navigate(`/lobby/${roomId}`)
	}

	function returnToHome() {
		leaveRoom(roomId)
		navigate(`/`)
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
					<Card className="bg-secondary/5 border-secondary/20 backdrop-blur-sm min-w-[350px]">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl text-secondary">
								🏆 Résultats
							</CardTitle>
						</CardHeader>
						<CardDescription className="px-4">
							<div className="grid grid-cols-3 justify-center items-end gap-4 mb-4">
								<div className="col-span-1">
									<PodiumBar player={second} position={2} />
								</div>
								<div className="col-span-1">
									<PodiumBar player={first} position={1} />
								</div>
								<div className="col-span-1">
									<PodiumBar player={third} position={3} />
								</div>
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

					<div className="flex gap-2 justify-center">
						<Button
							onClick={returnToHome}
							variant="destructive"
							className="hover:cursor-pointer mt-6"
						>
							Quitter la partie
						</Button>
						<Button
							onClick={restartGame}
							variant="secondary"
							className="hover:cursor-pointer mt-6"
						>
							Rejouer
						</Button>
					</div>
				</div>
			</section>
		</>
	)
}
