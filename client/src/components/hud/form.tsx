import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HudForm() {
	return (
		<div className="flex gap-2">
			<Input
				placeholder="Entrez le nom du pays"
				className="bg-background"
			/>
			<Button variant="secondary">Submit</Button>
		</div>
	)
}
