import { useState } from "react"
import { useParams } from "react-router"
import { Canvas } from "@react-three/fiber"
import Experience from "@/components/3d/dot-earth/experience"
import LobbyRoom from "@/components/lobby/lobby-room"
import { useSocket } from "@/contexts/socket-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UsersIcon } from "lucide-react"

export default function Lobby() {
	const { roomId } = useSocket()
	const { roomId: urlRoomId } = useParams<{ roomId: string }>()
	const { joinRoom } = useSocket()
	const [username, setUsername] = useState("")
	const [error, setError] = useState("")

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

		if (!urlRoomId) {
			setError("Code de partie invalide")
			return
		}

		joinRoom(urlRoomId, username.trim())
		setError("")
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleJoinRoom()
		}
	}

	const handleDisplayLobby = () => {
		return roomId ? (
			<LobbyRoom />
		) : (
			<div className="bg-black/95 border border-secondary/30 backdrop-blur-sm rounded-lg p-8 max-w-md w-full mx-4">
				<h2 className="text-2xl font-light text-secondary uppercase tracking-wide text-center mb-2">
					Rejoindre la partie
				</h2>
				<p className="text-secondary/70 text-center mb-6 text-sm">
					Entrez votre nom pour rejoindre
				</p>
				<div className="space-y-4">
					<div className="space-y-2">
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
							autoFocus
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
			</div>
		)
	}

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-screen">
				<Canvas camera={{ fov: 30, position: [6, 0, 0] }}>
					<Experience />
				</Canvas>
			</div>

			<section className="h-screen flex items-center justify-center bg-black">
				<div className="relative z-20">{handleDisplayLobby()}</div>
			</section>
		</>
	)
}
