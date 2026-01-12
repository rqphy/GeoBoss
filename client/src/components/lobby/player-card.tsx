import type { Player } from "@/types/game"
import { Crown } from "lucide-react"

interface PlayerCardProps {
	player: Player
	isHost?: boolean
	isYou?: boolean
}

export default function PlayerCard({ player, isHost, isYou }: PlayerCardProps) {
	return (
		<div
			className="min-w-[140px] rounded-md p-2 border border-secondary/20"
			style={{
				backgroundColor: isYou ? `${player.color}40` : "transparent",
			}}
		>
			<p style={{ color: player.color }}>
				{player.name} {isHost && <Crown className="inline w-4 h-4" />}
			</p>
		</div>
	)
}
