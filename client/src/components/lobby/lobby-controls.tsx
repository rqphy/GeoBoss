import { Button } from "@/components/ui/button"
import { useSocket } from "@/contexts/socket-context"
import { useNavigate } from "react-router"

export default function LobbyControls() {
	const navigate = useNavigate()
	const { roomId, currentPlayer, playersList, startGame, leaveRoom } =
		useSocket()

	const handleLeaveRoom = () => {
		leaveRoom(roomId)
		navigate("/")
	}

	const handleStartGame = () => {
		if (currentPlayer?.isAdmin && playersList.length >= 2) {
			startGame()
		}
	}

	return (
		<div className="flex gap-2 mt-4 justify-center">
			<Button variant="destructive" onClick={handleLeaveRoom}>
				Quitter la partie
			</Button>

			{currentPlayer?.isAdmin && (
				<Button variant="secondary" onClick={handleStartGame}>
					Commencer la partie
				</Button>
			)}
		</div>
	)
}
