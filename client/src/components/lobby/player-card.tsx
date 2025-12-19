import type { Player } from "@/types/game"

interface PlayerCardProps {
	player: Player
	isHost?: boolean
	isYou?: boolean
}

export default function PlayerCard({ player, isHost, isYou }: PlayerCardProps) {
	return (
		<div
			className="rounded-md p-2"
			style={{
				backgroundColor: isYou ? `${player.color}40` : "transparent",
			}}
		>
			<p style={{ color: player.color }}>{player.name}</p>
		</div>
	)
}
