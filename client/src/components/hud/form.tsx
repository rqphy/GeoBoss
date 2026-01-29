import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

interface HudFormProps {
	submitAnswer: (answer: string) => void
	answerFeedback: "correct" | "incorrect" | null
	disabled: boolean
}

export default function HudForm({
	submitAnswer,
	answerFeedback,
	disabled,
}: HudFormProps) {
	const [answer, setAnswer] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!disabled && inputRef.current) {
			inputRef.current.focus()
		}
	}, [disabled])

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (disabled) return
		if (!answer) return
		if (answer.length < 3) return
		if (answer.length > 50) return
		submitAnswer(answer)
		setAnswer("")
	}

	const feedbackStyles = {
		correct:
			"border-green-500 bg-green-500 ring-2 ring-green-500/50 placeholder:text-foreground",
		incorrect:
			"border-red-500 bg-red-500/80 animate-shake placeholder:text-foreground",
	}

	return (
		<form onSubmit={handleSubmit} className="w-full md:flex gap-2">
			<Input
				ref={inputRef}
				placeholder={
					disabled ? "Bonne réponse !" : "Entrez le nom du pays"
				}
				className={`w-full mb-2 md:mb-0 md:w-auto h-12 md:h-9 bg-background transition-all duration-200 ${
					answerFeedback ? feedbackStyles[answerFeedback] : ""
				} `}
				value={answer}
				autoFocus
				disabled={disabled}
				onChange={(e) => setAnswer(e.target.value)}
			/>
			<Button
				variant="secondary"
				type="submit"
				disabled={disabled}
				className="w-full md:w-auto h-12 md:h-9"
			>
				Submit
			</Button>
		</form>
	)
}
