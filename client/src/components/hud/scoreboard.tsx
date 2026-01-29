import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Player } from "@/types/game"

export default function Scoreboard({ playersList }: { playersList: Player[] }) {
	const [isExpanded, setIsExpanded] = useState(() => {
		if (typeof window === "undefined") return false
		return window.innerWidth >= 768
	})

	return (
		<div
			className={`flex flex-col gap-2 p-4 bg-background rounded-lg max-w-xs relative transition-transform duration-300 ease-in-out ${
				isExpanded ? "translate-x-0" : "translate-x-full"
			}`}
		>
			<h2 className="text-foreground text-md font-bold mb-2">
				Scoreboard
			</h2>
			{playersList
				.sort((a, b) => b.score - a.score)
				.map((player) => (
					<div
						key={player.name}
						className="flex justify-between items-center gap-2 p-2 rounded transition-colors duration-300"
						style={{
							backgroundColor: player.hasFoundAnswer
								? `${player.color}40` // 25% opacity (hex 40) for desaturated look
								: "transparent",
						}}
					>
						<span
							className="font-semibold text-sm"
							style={{ color: player.color }}
						>
							{player.name}
						</span>
						<span className="text-foreground font-mono text-sm">
							{player.score}
						</span>
					</div>
				))}

			<Button
				variant="secondary"
				className="w-8 h-8 absolute -left-10 top-1/2 -translate-y-1/2"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{isExpanded ? <ChevronRight /> : <ChevronLeft />}
			</Button>
		</div>
	)
}
