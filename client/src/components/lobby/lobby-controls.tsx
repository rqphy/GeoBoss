import { Button } from "@/components/ui/button"

export default function LobbyControls() {
	return (
		<div className="flex gap-2 mt-4">
			<Button variant="destructive">Quitter la partie</Button>
			<Button variant="secondary">Commencer la partie</Button>
		</div>
	)
}
