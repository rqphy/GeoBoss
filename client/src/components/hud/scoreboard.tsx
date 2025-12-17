import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Player = {
	name: string
	score: number
	color: string
	hasFoundAnswer: boolean
}

const FAKE_PLAYERS: Player[] = [
	{ name: "Alice", score: 1200, color: "#FF5733", hasFoundAnswer: true },
	{ name: "Bob", score: 850, color: "#33FF57", hasFoundAnswer: false },
	{ name: "Charlie", score: 1500, color: "#3357FF", hasFoundAnswer: true },
	{ name: "David", score: 600, color: "#F333FF", hasFoundAnswer: false },
]

export default function Scoreboard() {
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<div
			className={`flex flex-col gap-2 p-4 bg-background rounded-lg max-w-xs relative transition-transform duration-300 ease-in-out ${
				isExpanded ? "translate-x-0" : "translate-x-[100%]"
			}`}
		>
			<h2 className="text-foreground text-md font-bold mb-2">
				Scoreboard
			</h2>
			{FAKE_PLAYERS.sort((a, b) => b.score - a.score).map((player) => (
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
