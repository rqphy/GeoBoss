import { useEffect, useState } from "react"
import { Timer as TimerIcon } from "lucide-react"

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
			<p className="font-family text-sm">Round : {roundNumber} / 20</p>
			<div className="flex justify-center items-center bg-background rounded-md text-foreground mt-2">
				<TimerIcon className="w-6 h-6 inline mr-2" />
				<p className="font-family-secondary text-2xl">{timeLeft}</p>
			</div>
		</div>
	)
}
