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
				} else {
					setPlayersList((prevPlayers) => [...prevPlayers, player])
				}
			}
		)

		socket.on(SOCKET_EVENTS.PLAYER_LEFT, (playerId: string) => {
			setPlayersList((prevPlayers) =>
				prevPlayers.filter((p) => p.id !== playerId)
			)
		})

		socket.on(
			SOCKET_EVENTS.ROOM_CREATED,
			({ roomId, player }: { roomId: string; player: Player }) => {
				setRoomId(roomId)
				setCurrentPlayer(player)
				setPlayersList([player])
				console.log("playersList", playersList)
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
						p.id === playerId ? { ...p, score: score } : p
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
			socket.off(SOCKET_EVENTS.CONNECTION)
			socket.off(SOCKET_EVENTS.DISCONNECTION)
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
			socket.emit(SOCKET_EVENTS.LEAVE_ROOM, { roomId })
		},
		startGame() {
			socket.emit(SOCKET_EVENTS.START_GAME, { roomId })
		},
		submitAnswer(answer: string) {
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
