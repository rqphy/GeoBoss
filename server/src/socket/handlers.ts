import { Server, Socket } from "socket.io"
import { SOCKET_EVENTS } from "./events.js"
import { GameRoom } from "../game/game-room.js"
import type { Player } from "../types/index.js"

const rooms = new Map<string, GameRoom>()

// Helper function to find which room a player is in
function findPlayerRoom(
	playerId: string
): { room: GameRoom; roomId: string } | null {
	for (const [roomId, room] of rooms.entries()) {
		if (room.hasPlayer(playerId)) {
			return { room, roomId }
		}
	}
	return null
}

export function initializeSocketHandlers(io: Server) {
	io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
		console.log("Client connected:", socket.id)

		// Create room
		socket.on(SOCKET_EVENTS.CREATE_ROOM, (playerName: string) => {
			const room = new GameRoom(io)
			rooms.set(room.id, room)

			const player: Player = {
				id: socket.id,
				name: playerName,
				score: 0,
				isAdmin: true,
			}

			room.addPlayer(player)
			socket.join(room.id)

			console.log("Room created:", room.id)

			socket.emit(SOCKET_EVENTS.ROOM_CREATED, {
				roomId: room.id,
				player,
			})
		})

		// Join room
		socket.on(
			SOCKET_EVENTS.JOIN_ROOM,
			({
				roomId,
				playerName,
			}: {
				roomId: string
				playerName: string
			}) => {
				const room = rooms.get(roomId)
				if (!room) {
					socket.emit(SOCKET_EVENTS.ERROR, "Room not found")
					return
				}

				if (room.isGameStarted) {
					socket.emit(SOCKET_EVENTS.ERROR, "Game already started")
					return
				}

				const player: Player = {
					id: socket.id,
					name: playerName,
					score: 0,
					isAdmin: false,
				}

				room.addPlayer(player)
				socket.join(roomId)

				socket.emit(SOCKET_EVENTS.PLAYER_JOINED, {
					player,
					room: room.getState(),
				})

				socket.to(roomId).emit(SOCKET_EVENTS.PLAYER_JOINED, {
					player,
				})
			}
		)

		// TODO: leave room handler

		// Start game
		socket.on(SOCKET_EVENTS.START_GAME, (roomId: string) => {
			const room = rooms.get(roomId)
			if (!room) return

			const admin = room.getPlayer(socket.id)
			if (!admin || !admin.isAdmin) {
				socket.emit(SOCKET_EVENTS.ERROR, "You are not the admin")
				return
			}

			room.startGame()
		})

		// Submit answer
		socket.on(
			SOCKET_EVENTS.SUBMIT_ANSWER,
			({ roomId, answer }: { roomId: string; answer: string }) => {
				const room = rooms.get(roomId)
				if (!room) return

				room.submitAnswer(socket.id, answer)
			}
		)

		// Disconnect handler
		socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
			const playerRoom = findPlayerRoom(socket.id)
			if (!playerRoom) return

			const { room, roomId } = playerRoom
			const player = room.getPlayer(socket.id)
			const wasAdmin = player?.isAdmin || false

			room.removePlayer(socket.id)
			io.to(roomId).emit(SOCKET_EVENTS.PLAYER_LEFT, {
				playerId: socket.id,
				isAdmin: wasAdmin,
			})

			// Clean up empty room or reassign admin
			if (room.isEmpty()) {
				rooms.delete(roomId)
			} else if (wasAdmin) {
				const remainingPlayers = room.getState().players
				const nextAdmin = remainingPlayers[0]
				if (nextAdmin) {
					room.updateAdmin(nextAdmin.id)
				}
			}
		})
	})
}
