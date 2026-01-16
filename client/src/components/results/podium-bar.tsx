import type { Player } from "@/types/game"

export default function PodiumBar({
	player,
	position,
}: {
	player: Player | undefined
	position: 1 | 2 | 3
}) {
	if (!player) return null

	const heights = {
		1: "h-40",
		2: "h-28",
		3: "h-20",
	}

	const medals = {
		1: "🥇",
		2: "🥈",
		3: "🥉",
	}

	const colors = {
		1: "bg-yellow-400",
		2: "bg-gray-300",
		3: "bg-amber-600",
	}

	return (
		<div className="flex flex-col items-center gap-2">
			<span className="text-3xl">{medals[position]}</span>
			<p
				className="font-bold text-lg truncate max-w-24"
				style={{ color: player.color }}
			>
				{player.name}
			</p>
			<p className="text-sm text-secondary">{player.score} pts</p>
			<div
				className={`w-24 ${heights[position]} ${colors[position]} rounded-t-lg flex items-end justify-center pb-2 transition-all duration-500 animate-grow-up`}
			>
				<span className="text-2xl font-bold">{position}</span>
			</div>
		</div>
	)
}
