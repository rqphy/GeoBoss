import type { Player } from "@/types/game"

export default function Answer({
	correctAnswer,
	roundWinner,
}: {
	correctAnswer: string
	roundWinner: Player | null
}) {
	return (
		<div className="flex flex-col items-center gap-4 bg-white rounded-xl p-6 text-center">
			<p className="text-xl font-bold ">La réponse était: </p>
			<p className="text-4xl font-black ">{correctAnswer}</p>
			{roundWinner && (
				<p className="text-xl font-bold ">
					<span style={{ color: roundWinner.color }}>
						{roundWinner.name}
					</span>{" "}
					a été le plus rapide !
				</p>
			)}
		</div>
	)
}
