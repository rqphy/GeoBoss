export interface Player {
	id: string
	name: string
	score: number
	isAdmin: boolean
	color: string
}

export interface GameState {
	roomId: string
	players: Player[]
	currentRound: number
	maxRounds: number
	isGameStarted: boolean
}

export interface RoomCreateData {
	playerName: string
}

export interface RoomJoinData {
	roomId: string
	playerName: string
}
