import { createContext, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"
import { SOCKET_EVENTS } from "../socket/events.ts"
import type { Player } from "../types/game.ts"

interface SocketProviderMethods {
	createRoom: (playerName: string) => void
	joinRoom: (playerName: string, roomId: string) => void
	leaveRoom: () => void

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
	socket: Socket
	methods: SocketProviderMethods
	state: SocketStates
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
		})
		socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
			setIsConnected(false)
		})

		socket.on(SOCKET_EVENTS.PLAYER_JOINED, (player: Player) => {
			setPlayersList((prevPlayers) => [...prevPlayers, player])
		})

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
				// redirect to /lobby/roomid
			}
		)

		socket.on(SOCKET_EVENTS.GAME_STARTED, () => {
			setIsGameStarted(true)
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

		socket.on(
			SOCKET_EVENTS.END_ROUND,
			({
				correctAnswer,
				scores,
			}: {
				correctAnswer: string
				scores: { id: string; name: string; score: number }[]
			}) => {
				// TODO: update players list
			}
		)

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
			socket.emit(SOCKET_EVENTS.CREATE_ROOM, { playerName })
		},
		joinRoom(roomId: string, playerName: string) {
			socket.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId, playerName })
		},
		leaveRoom() {
			socket.emit(SOCKET_EVENTS.LEAVE_ROOM)
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
		<socketContext.Provider value={{ socket, methods, state }}>
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
