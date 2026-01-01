import { Button } from "@/components/ui/button"
import { useSocket } from "@/contexts/socket-context"
import { useNavigate } from "react-router"

export default function LobbyControls() {
	const navigate = useNavigate()
	const { roomId, leaveRoom } = useSocket()

	const handleLeaveRoom = () => {
		leaveRoom(roomId)
		navigate("/")
	}

	return (
		<div className="flex gap-2 mt-4">
			<Button variant="destructive" onClick={handleLeaveRoom}>
				Quitter la partie
			</Button>
			<Button variant="secondary">Commencer la partie</Button>
		</div>
	)
}
