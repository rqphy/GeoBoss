import { useEffect, useState } from "react"

export default function Timer({
	totalTime,
	roundNumber,
}: {
	totalTime: number
	roundNumber: number
}) {
	const [timeLeft, setTimeLeft] = useState(totalTime)

	useEffect(() => {
		setTimeLeft(totalTime)
	}, [totalTime])

	useEffect(() => {
		if (timeLeft <= 0) return

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft])

	return (
		<div className="text-background text-center">
			<div>
				<p className="font-family text-sm">
					Round : {roundNumber} / 20
				</p>
			</div>
			<p className="font-family text-2xl mt-2">{timeLeft}</p>
		</div>
	)
}
