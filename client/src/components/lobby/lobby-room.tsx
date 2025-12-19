import PlayerCard from "./player-card"
import LobbyControls from "./lobby-controls"
import { MOCK_PLAYERS } from "@/mocks/data"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router"

export default function LobbyRoom() {
	const { roomId } = useParams<{ roomId: string }>()

	return (
		<>
			<Card className="bg-background/5 border-secondary/20 backdrop-blur-sm text-center p-4">
				<CardHeader>
					<h2 className="text-2xl text-secondary font-bold">
						Joueurs {MOCK_PLAYERS.length}/8
					</h2>
				</CardHeader>
				<ul className="grid grid-cols-2 gap-2">
					{MOCK_PLAYERS.map((player) => (
						<li key={player.id}>
							<PlayerCard
								player={player}
								isYou={player.id === MOCK_PLAYERS[0].id}
							/>
						</li>
					))}
				</ul>
			</Card>
			<Card className="absolute top-0 -left-full w-[200px] bg-background/5 border-secondary/20 backdrop-blur-sm text-center p-4">
				<CardHeader>
					<h2 className="text-2xl text-secondary font-bold">
						{roomId}
					</h2>
					<Button variant="secondary">Copier le code</Button>
				</CardHeader>
			</Card>
			<LobbyControls />
		</>
	)
}
