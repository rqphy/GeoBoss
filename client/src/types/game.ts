export type Player = {
	id: string
	name: string
	score: number
	color: string
	hasFoundAnswer: boolean
}

export type Room = {
	id: string
	hostId: string
	players: Player[]
	isGameStarted: boolean
}

export type Question = {
	id: string
	country: string
	capital: string
	type: "country-to-capital" | "capital-to-country"
	options: string[]
	correctAnswer: string
}
