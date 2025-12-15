export default function Timer({
	time,
	roundNumber,
}: {
	time: number
	roundNumber: number
}) {
	return (
		<div className="text-background text-center">
			<div>
				<p className="font-family text-sm">Round</p>
				<p className="font-family text-2xl">{roundNumber}</p>
			</div>
			<p>{time}</p>
		</div>
	)
}
