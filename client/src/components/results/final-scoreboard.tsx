import type { Player } from "@/types/game"

export default function FinalScoreboard({ players }: { players: Player[] }) {
	if (players.length === 0) return null

	return (
		<div className="w-full max-w-md bg-secondary/80 rounded-xl p-4">
			<h3 className="text-lg font-bold mb-3">Classement</h3>
			<div className="flex flex-col gap-2">
				{players.map((player, index) => (
					<div
						key={player.id}
						className="flex items-center justify-between py-2 px-3 bg-secondary/20 rounded-lg"
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
		</div>
	)
}
