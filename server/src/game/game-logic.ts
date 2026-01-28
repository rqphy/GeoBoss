import Fuse from "fuse.js"
import { removeAccents } from "../utils/index.js"
import type { Country } from "./countries.js"

export function calculateScore(
	timeRemaining: number,
	totalTime: number,
): number {
	const baseScore = 100
	const speedBonus = Math.floor((timeRemaining / totalTime) * (baseScore / 2))

	return baseScore + speedBonus
}

export function isAnswerCorrect(answer: string, country: Country): boolean {
	const normalizedAnswer = removeAccents(answer.toLowerCase().trim())

	const validAnswers = [
		removeAccents(country.name.toLowerCase().trim()),
		...(country.aliases?.map((alias) =>
			removeAccents(alias.toLowerCase().trim()),
		) || []),
	]

	const minValidLength = Math.min(...validAnswers.map((a) => a.length))
	const minLength = Math.floor(minValidLength * 0.7)
	if (normalizedAnswer.length < minLength) {
		return false
	}

	const fuse = new Fuse(validAnswers, {
		threshold: 0.3,
		ignoreLocation: true,
		minMatchCharLength: minLength,
	})

	const result = fuse.search(normalizedAnswer)
	return result.length > 0
}
