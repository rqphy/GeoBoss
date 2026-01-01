import { GameRoom } from "../game/game-room.js"
import { Server } from "socket.io"
import { SOCKET_EVENTS } from "./events.js"

export const rooms = new Map<string, GameRoom>()

export const PLAYER_COLORS = [
	"#FF5733", // Red-Orange
	"#33FF57", // Green
	"#3357FF", // Blue
	"#F333FF", // Magenta
	"#FFD700", // Gold
	"#FF1493", // Deep Pink
	"#00CED1", // Dark Turquoise
	"#FF8C00", // Dark Orange
]

// Helper function to find which room a player is in
export function findPlayerRoom(
	playerId: string
): { room: GameRoom; roomId: string } | null {
	for (const [roomId, room] of rooms.entries()) {
		if (room.hasPlayer(playerId)) {
			return { room, roomId }
		}
	}
	return null
}

// Helper function to get an available color for a new player
export function getAvailableColor(room: GameRoom): string {
	const players = room.getState().players
	const usedColors = new Set(players.map((p) => p.color))

	// Find the first available color
	const availableColor = PLAYER_COLORS.find((color) => !usedColors.has(color))

	// If all colors are taken, generate a random color
	if (!availableColor) {
		// Generate a random color
		return `#${Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")}`
	}

	return availableColor
}

// Helper function to handle player removal from a room
export function handlePlayerRemoval(
	io: Server,
	playerId: string,
	roomId: string,
	room: GameRoom
): void {
	const player = room.getPlayer(playerId)
	const wasAdmin = player?.isAdmin || false

	room.removePlayer(playerId)

	console.log("player left", playerId, room.getState().players)

	// Clean up empty room
	if (room.isEmpty()) {
		rooms.delete(roomId)
		return
	}

	let newAdminId: string | undefined = undefined

	// If the player who left was admin, assign new admin
	if (wasAdmin) {
		const remainingPlayers = room.getState().players
		const nextAdmin = remainingPlayers[0]
		if (nextAdmin) {
			room.updateAdmin(nextAdmin.id)
			newAdminId = nextAdmin.id
		}
	}

	// Emit player_left event to all other players in the room
	io.to(roomId).emit(SOCKET_EVENTS.PLAYER_LEFT, {
		playerId,
		players: room.getState().players,
		newAdminId,
	})
}
