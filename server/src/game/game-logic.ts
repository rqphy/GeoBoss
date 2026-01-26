import Fuse from "fuse.js"
import { removeAccents } from "../utils/index.js"

export function calculateScore(timeRemaining: number): number {
	const baseScore = 100
	const speedBonus = Math.floor(timeRemaining * 1.5)

	return baseScore + speedBonus
}

export function isAnswerCorrect(
	answer: string,
	correctAnswer: string,
): boolean {
	const normalizedAnswer = removeAccents(answer.toLowerCase().trim())
	const normalizedCorrect = removeAccents(correctAnswer.toLowerCase().trim())

	// Length check: answer must be at least 70% of correct answer length
	const minLength = Math.floor(normalizedCorrect.length * 0.7)
	if (normalizedAnswer.length < minLength) {
		return false
	}

	const fuse = new Fuse([normalizedCorrect], {
		threshold: 0.3,
		ignoreLocation: true,
		minMatchCharLength: Math.floor(normalizedCorrect.length * 0.7),
	})

	const result = fuse.search(normalizedAnswer)
	return result.length > 0
}
