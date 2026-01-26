import { Server } from "socket.io"
import { SOCKET_EVENTS } from "../socket/events.js"
import { getRandomCountryByRound, type Country } from "./countries.js"
import { calculateScore, isAnswerCorrect } from "./game-logic.js"
import type { Player, GameState } from "../types/index.js"

export class GameRoom {
	id: string
	players: Map<string, Player>
	fastestPlayer: Player | null = null
	playersWhoFoundAnswer: Set<string> = new Set()
	currentRound: number = 0
	roundTimeSeconds: number = 5
	maxRounds: number = 2
	isGameStarted: boolean = false
	currentCountry: Country | null = null
	roundTimer: NodeJS.Timeout | null = null
	roundStartTime: number | null = null
	io: Server

	constructor(io: Server) {
		this.id = this.generateRoomId()
		this.players = new Map()
		this.io = io
	}

	private generateRoomId(): string {
		return Math.random().toString(36).substring(2, 8).toUpperCase()
	}

	addPlayer(player: Player) {
		this.players.set(player.id, player)
	}

	removePlayer(playerId: string) {
		this.players.delete(playerId)
	}

	getPlayer(playerId: string): Player | undefined {
		return this.players.get(playerId)
	}

	getRoundWinner(scores: Player[]) {
		return scores.sort((a, b) => b.score - a.score)[0]
	}

	updateAdmin(playerId: string) {
		const player = this.getPlayer(playerId)
		if (!player) return
		player.isAdmin = true
	}

	hasPlayer(playerId: string): boolean {
		return this.players.has(playerId)
	}

	isEmpty(): boolean {
		return this.players.size === 0
	}

	startGame() {
		if (this.roundTimer) {
			clearTimeout(this.roundTimer)
			this.roundTimer = null
		}
		this.currentRound = 0
		this.fastestPlayer = null
		this.playersWhoFoundAnswer.clear()
		this.currentCountry = null
		this.players.forEach((player) => {
			player.score = 0
		})

		this.isGameStarted = true
		this.io.to(this.id).emit(SOCKET_EVENTS.GAME_STARTED)
		this.startNewRound()
	}

	startNewRound() {
		this.currentRound++

		if (this.currentRound > this.maxRounds) {
			this.endGame()
			return
		}

		this.roundStartTime = Date.now()
		this.playersWhoFoundAnswer.clear()

		this.currentCountry = getRandomCountryByRound(
			this.currentRound,
			this.maxRounds,
		)
		this.io.to(this.id).emit(SOCKET_EVENTS.NEW_ROUND, {
			round: this.currentRound,
			country: this.currentCountry.name,
			countryCode: this.currentCountry.code,
			timeLimit: this.roundTimeSeconds,
		})

		this.roundTimer = setTimeout(() => {
			this.endRound()
		}, this.roundTimeSeconds * 1000)
	}

	submitAnswer(playerId: string, answer: string) {
		const player = this.getPlayer(playerId)
		if (!player || !this.currentCountry) return
		if (!this.roundStartTime) return

		const isCorrect = isAnswerCorrect(answer, this.currentCountry)

		if (isCorrect) {
			const timeRemaining =
				this.roundTimeSeconds -
				(Date.now() - this.roundStartTime) / 1000

			const points = calculateScore(timeRemaining)
			console.log("points", points, timeRemaining)
			player.score += points

			if (!this.fastestPlayer) {
				this.fastestPlayer = player
			}

			// Track player who found the answer
			this.playersWhoFoundAnswer.add(playerId)

			this.io.to(this.id).emit(SOCKET_EVENTS.GOOD_ANSWER, {
				playerId,
				score: player.score,
			})

			// If all players found the answer, end round early
			if (this.playersWhoFoundAnswer.size === this.players.size) {
				this.endRound()
			}
		} else {
			this.io.to(this.id).emit(SOCKET_EVENTS.BAD_ANSWER, {
				playerId,
				answer,
			})
		}
	}

	endRound() {
		if (this.roundTimer) {
			clearTimeout(this.roundTimer)
			this.roundTimer = null
		}

		this.roundStartTime = null

		const scores = Array.from(this.players.values()).map((p) => ({
			id: p.id,
			name: p.name,
			score: p.score,
		}))

		this.io.to(this.id).emit(SOCKET_EVENTS.END_ROUND, {
			correctAnswer: this.currentCountry?.name ?? "",
			scores,
			winnerId: this.fastestPlayer?.id,
		})

		this.fastestPlayer = null

		setTimeout(() => this.startNewRound(), 3000)
	}

	endGame() {
		this.isGameStarted = false

		const finalScores = Array.from(this.players.values()).sort(
			(a, b) => b.score - a.score,
		)

		this.io.to(this.id).emit(SOCKET_EVENTS.END_GAME, {
			scores: finalScores,
		})
	}

	getState(): GameState {
		return {
			roomId: this.id,
			players: Array.from(this.players.values()),
			currentRound: this.currentRound,
			maxRounds: this.maxRounds,
			isGameStarted: this.isGameStarted,
		}
	}
}
