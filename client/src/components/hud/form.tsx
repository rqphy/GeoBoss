import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function HudForm({
	submitAnswer,
}: {
	submitAnswer: (answer: string) => void
}) {
	const [answer, setAnswer] = useState("")

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		submitAnswer(answer)
		setAnswer("")
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<Input
				placeholder="Entrez le nom du pays"
				className="bg-background"
				value={answer}
				autoFocus
				onChange={(e) => setAnswer(e.target.value)}
			/>
			<Button variant="secondary" type="submit">
				Submit
			</Button>
		</form>
	)
}
