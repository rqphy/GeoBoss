import { Server, Socket } from "socket.io"
import { SOCKET_EVENTS } from "./events.js"
import { GameRoom } from "../game/game-room.js"
import type { Player } from "../types/index.js"
import {
	rooms,
	getAvailableColor,
	findPlayerRoom,
	handlePlayerRemoval,
} from "./room-utils.js"

export function initializeSocketHandlers(io: Server) {
	io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
		console.log("Client connected:", socket.id)

		socket.on(SOCKET_EVENTS.CREATE_ROOM, (playerName: string) => {
			const room = new GameRoom(io)
			rooms.set(room.id, room)

			const color: string = getAvailableColor(room)

			const player: Player = {
				id: socket.id,
				name: playerName,
				score: 0,
				isAdmin: true,
				color,
			}

			room.addPlayer(player)
			socket.join(room.id)

			socket.emit(SOCKET_EVENTS.ROOM_CREATED, {
				roomId: room.id,
				player,
			})
		})

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

				const color: string = getAvailableColor(room)

				const player: Player = {
					id: socket.id,
					name: playerName,
					score: 0,
					isAdmin: false,
					color,
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

		socket.on(SOCKET_EVENTS.LEAVE_ROOM, (roomId: string) => {
			const room = rooms.get(roomId)
			if (!room) return

			socket.leave(roomId)
			handlePlayerRemoval(io, socket.id, roomId, room)
		})

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

		socket.on(
			SOCKET_EVENTS.SUBMIT_ANSWER,
			({ roomId, answer }: { roomId: string; answer: string }) => {
				console.log("Answer submitted:", socket.id, answer)
				const room = rooms.get(roomId)
				if (!room) return

				room.submitAnswer(socket.id, answer)
			}
		)

		socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
			const playerRoom = findPlayerRoom(socket.id)
			if (!playerRoom) return

			const { room, roomId } = playerRoom
			handlePlayerRemoval(io, socket.id, roomId, room)
		})
	})
}
