import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { SOCKET_EVENTS } from "../socket/events.ts"
import type { Player, GameState } from "../types/game.ts"

interface SocketProviderMethods {
	createRoom: (playerName: string) => void
	joinRoom: (playerName: string, roomId: string) => void
	leaveRoom: (roomId: string) => void

	startGame: () => void
	submitAnswer: (answer: string) => void
}

interface SocketStates {
	isConnected: boolean
	roomId: string
	playersList: Player[]
	isGameStarted: boolean
	currentRound: number
	currentPlayer: Player | null
	timeLimit: number
}

interface SocketProviderProps {
	children: React.ReactNode
}

interface SocketContextValue {
	// States
	isConnected: boolean
	roomId: string
	playersList: Player[]
	isGameStarted: boolean
	currentRound: number
	currentPlayer: Player | null
	timeLimit: number

	// Methods
	createRoom: (playerName: string) => void
	joinRoom: (playerName: string, roomId: string) => void
	leaveRoom: (roomId: string) => void

	startGame: () => void
	submitAnswer: (answer: string) => void
}

const socketContext = createContext<SocketContextValue | null>(null)
const serverAddress = "http://localhost:3000"
const socket: Socket = io(serverAddress, {
	withCredentials: true,
	transports: ["websocket"],
})

export function SocketProvider({ children }: SocketProviderProps) {
	const [playersList, setPlayersList] = useState<Player[]>([])
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [roomId, setRoomId] = useState<string>("")
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
	const [currentRound, setCurrentRound] = useState<number>(0)
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
	const [timeLimit, setTimeLimit] = useState<number>(0)

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true)
			console.log("connected")
		})
		socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
			setIsConnected(false)
		})

		socket.on(
			SOCKET_EVENTS.PLAYER_JOINED,
			({ player, room }: { player: Player; room: GameState }) => {
				if (room) {
					setRoomId(room.roomId)
					setIsGameStarted(room.isGameStarted)
					setCurrentRound(room.currentRound)
					setPlayersList(room.players)
					setCurrentPlayer(player)
				} else {
					setPlayersList((prevPlayers) => [...prevPlayers, player])
				}
			}
		)

		socket.on(
			SOCKET_EVENTS.PLAYER_LEFT,
			({
				playerId,
				players,
				newAdminId,
			}: {
				playerId: string
				players: Player[]
				newAdminId: string | undefined
			}) => {
				setPlayersList(players)

				if (newAdminId && currentPlayer?.id === playerId) {
					setCurrentPlayer((prev) =>
						prev ? { ...prev, isAdmin: true } : null
					)
				}
			}
		)

		socket.on(
			SOCKET_EVENTS.ROOM_CREATED,
			({ roomId, player }: { roomId: string; player: Player }) => {
				setRoomId(roomId)
				setCurrentPlayer(player)
				setPlayersList([player])
			}
		)

		socket.on(SOCKET_EVENTS.GAME_STARTED, () => {
			setIsGameStarted(true)
			setCurrentRound(1)
		})

		socket.on(SOCKET_EVENTS.END_GAME, () => {
			setIsGameStarted(false)
		})

		socket.on(
			SOCKET_EVENTS.NEW_ROUND,
			({
				round,
				country,
				timeLimit,
			}: {
				round: number
				country: string
				timeLimit: number
			}) => {
				setCurrentRound(round)
				setTimeLimit(timeLimit)
				setPlayersList((prevPlayers) =>
					prevPlayers.map((p) =>
						p.id === currentPlayer?.id
							? { ...p, hasFoundAnswer: false }
							: p
					)
				)
			}
		)

		// socket.on(
		// 	SOCKET_EVENTS.END_ROUND,
		// 	({
		// 		correctAnswer,
		// 		scores,
		// 	}: {
		// 		correctAnswer: string
		// 		scores: { id: string; name: string; score: number }[]
		// 	}) => {
		// 		// TODO: update players list
		// 	}
		// )

		socket.on(
			SOCKET_EVENTS.GOOD_ANSWER,
			({ playerId, score }: { playerId: string; score: number }) => {
				setPlayersList((prevPlayers) =>
					prevPlayers.map((p) =>
						p.id === playerId
							? { ...p, score: score, hasFoundAnswer: true }
							: p
					)
				)
			}
		)

		socket.on(
			SOCKET_EVENTS.BAD_ANSWER,
			({ playerId }: { playerId: string }) => {
				// TODO: if playerId correspond -> show it's a bad answer + bg
			}
		)

		return () => {
			socket.off("connect")
			socket.off(SOCKET_EVENTS.DISCONNECTION)
			socket.off(SOCKET_EVENTS.PLAYER_JOINED)
			socket.off(SOCKET_EVENTS.PLAYER_LEFT)
			socket.off(SOCKET_EVENTS.ROOM_CREATED)
			socket.off(SOCKET_EVENTS.GAME_STARTED)
			socket.off(SOCKET_EVENTS.END_GAME)
			socket.off(SOCKET_EVENTS.NEW_ROUND)
			socket.off(SOCKET_EVENTS.GOOD_ANSWER)
			socket.off(SOCKET_EVENTS.BAD_ANSWER)
		}
	}, [])

	const methods: SocketProviderMethods = {
		createRoom(playerName: string) {
			socket.emit(SOCKET_EVENTS.CREATE_ROOM, playerName)
		},
		joinRoom(roomId: string, playerName: string) {
			socket.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId, playerName })
		},
		leaveRoom(roomId: string) {
			socket.emit(SOCKET_EVENTS.LEAVE_ROOM, roomId)
			// Clear local state
			setRoomId("")
			setPlayersList([])
			setCurrentPlayer(null)
		},
		startGame() {
			socket.emit(SOCKET_EVENTS.START_GAME, roomId)
		},
		submitAnswer(answer: string) {
			console.log("submit answer", answer)
			socket.emit(SOCKET_EVENTS.SUBMIT_ANSWER, { roomId, answer })
		},
	}

	const state: SocketStates = {
		isConnected,
		roomId,
		playersList,
		isGameStarted,
		currentRound,
		currentPlayer,
		timeLimit,
	}

	return (
		<socketContext.Provider value={{ ...methods, ...state }}>
			{children}
		</socketContext.Provider>
	)
}

export function useSocket() {
	const context = useContext(socketContext)
	if (!context) {
		throw new Error("useSocket must be used within a SocketProvider")
	}
	return context
}
