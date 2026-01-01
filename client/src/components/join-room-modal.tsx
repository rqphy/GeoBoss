import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UsersIcon } from "lucide-react"
import { useSocket } from "@/contexts/socket-context"

interface JoinRoomModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export default function JoinRoomModal({
	open,
	onOpenChange,
}: JoinRoomModalProps) {
	const [username, setUsername] = useState("")
	const [roomId, setRoomId] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const { roomId: joinedRoomId, joinRoom } = useSocket()

	useEffect(() => {
		if (joinedRoomId) {
			onOpenChange(false)
			navigate(`/lobby/${joinedRoomId}`)
		}
	}, [joinedRoomId])

	const handleJoinRoom = () => {
		// Validate username
		if (!username.trim()) {
			setError("Veuillez entrer un nom d'utilisateur")
			return
		}

		if (username.trim().length < 2) {
			setError("Le nom doit contenir au moins 2 caractères")
			return
		}

		if (username.trim().length > 20) {
			setError("Le nom ne peut pas dépasser 20 caractères")
			return
		}

		// Validate room ID
		if (!roomId.trim()) {
			setError("Veuillez entrer un code de partie")
			return
		}

		joinRoom(roomId.trim(), username.trim())

		// Reset form
		setUsername("")
		setRoomId("")
		setError("")
		onOpenChange(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleJoinRoom()
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-black/95 border-secondary/30 backdrop-blur-sm">
				<DialogHeader>
					<DialogTitle className="text-2xl font-light text-secondary uppercase tracking-wide">
						Rejoindre une partie
					</DialogTitle>
					<DialogDescription className="text-secondary/70">
						Entrez le code de la partie et votre nom
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<Input
							id="roomId"
							placeholder="Code de la partie"
							value={roomId}
							onChange={(e) => {
								setRoomId(e.target.value)
								setError("")
							}}
							onKeyDown={handleKeyDown}
							className="bg-secondary/5 border-secondary/30 text-secondary placeholder:text-secondary/50 focus:border-secondary/60"
							autoFocus
						/>
						<Input
							id="username"
							placeholder="Votre nom d'utilisateur"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value)
								setError("")
							}}
							onKeyDown={handleKeyDown}
							className="bg-secondary/5 border-secondary/30 text-secondary placeholder:text-secondary/50 focus:border-secondary/60"
						/>
						{error && (
							<p className="text-sm text-red-400 animate-in slide-in-from-top-1">
								{error}
							</p>
						)}
					</div>
					<Button
						onClick={handleJoinRoom}
						className="w-full bg-secondary hover:bg-secondary/90 text-black font-medium"
					>
						Rejoindre la partie
						<UsersIcon className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
