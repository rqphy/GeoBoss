import PlayerCard from "./player-card"
import LobbyControls from "./lobby-controls"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { useSocket } from "@/contexts/socket-context"

export default function LobbyRoom() {
	const { roomId, playersList, currentPlayer } = useSocket()
	const [copied, setCopied] = useState(false)

	const handleCopyUrl = async () => {
		try {
			const url = window.location.href
			await navigator.clipboard.writeText(url)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy URL:", err)
		}
	}

	return (
		<>
			<Card className="bg-background/5 border-secondary/20 backdrop-blur-sm text-center p-4">
				<CardHeader>
					<h2 className="text-2xl text-secondary font-bold">
						Joueurs {playersList.length}/8
					</h2>
				</CardHeader>
				<ul className="grid grid-cols-2 gap-2">
					{playersList.map((player) => (
						<li key={player.id}>
							<PlayerCard
								player={player}
								isYou={player.id === currentPlayer?.id}
								isHost={player.isAdmin}
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
					<Button
						variant="secondary"
						onClick={handleCopyUrl}
						className="gap-2"
					>
						{copied ? (
							<>
								<Check className="w-4 h-4" />
								Copié !
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								Copier le code
							</>
						)}
					</Button>
				</CardHeader>
			</Card>
			<LobbyControls />
		</>
	)
}
