import type { Player } from "@/types/game"
import type { WrongAnswer } from "@/contexts/socket-context"

interface WrongAnswerBackgroundProps {
	wrongAnswers: WrongAnswer[]
	playersList: Player[]
}

export default function WrongAnswerBackground({
	wrongAnswers,
	playersList,
}: WrongAnswerBackgroundProps) {
	const getPlayerColor = (playerId: string): string => {
		const player = playersList.find((p) => p.id === playerId)
		return player?.color ?? "#666"
	}

	if (wrongAnswers.length === 0) return null

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{wrongAnswers.map((wrongAnswer, index) => {
				const color = getPlayerColor(wrongAnswer.playerId)

				const left = ((index * 37 + 13) % 80) + 10
				const top = ((index * 53 + 17) % 60) + 15

				const rotation = ((index * 23) % 20) - 10

				return (
					<div
						key={`${wrongAnswer.playerId}-${index}`}
						className="absolute"
						style={{
							left: `${left}%`,
							top: `${top}%`,
							transform: `rotate(${rotation}deg)`,
						}}
					>
						<div
							className="text-white px-4 py-2 rounded-lg font-medium shadow-lg animate-fade-in"
							style={{
								backgroundColor: color,
							}}
						>
							{wrongAnswer.answer}
						</div>
					</div>
				)
			})}
		</div>
	)
}
