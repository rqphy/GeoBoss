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
	}, [totalTime, roundNumber])

	useEffect(() => {
		if (timeLeft <= 0) return

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft])

	const progress = Math.max(0, ((timeLeft - 1) / (totalTime - 1)) * 100)
	const radius = 34
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (progress / 100) * circumference

	// Urgency state when time is running low
	const isUrgent = timeLeft <= 5 && timeLeft > 0

	return (
		<div className="flex flex-col items-center gap-0 text-background text-center">
			<p className="font-family text-sm">Round : {roundNumber} / 20</p>
			<div
				className={`relative w-20 h-20 flex justify-center items-center ${
					isUrgent ? "animate-pulse" : ""
				}`}
			>
				<svg
					className="absolute top-0 left-0 w-full h-full -rotate-90"
					viewBox="0 0 120 120"
				>
					{/* Background circle */}
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						stroke="var(--background)"
						strokeWidth="4"
					/>
					{/* Progress circle */}
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						stroke={isUrgent ? "#ef4444" : "var(--primary)"}
						strokeWidth="4"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						className="transition-all duration-1000 ease-linear"
					/>
				</svg>
				<div
					className={`relative z-10 flex justify-center items-center w-12 h-12 rounded-full ${
						isUrgent ? "text-red-500" : "text-background"
					}`}
				>
					<p className="font-family-secondary text-2xl">{timeLeft}</p>
				</div>
			</div>
		</div>
	)
}
