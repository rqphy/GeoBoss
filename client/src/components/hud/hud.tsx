import HudForm from "./form"
import Timer from "./timer"

export default function Hud() {
	return (
		<div className="absolute top-0 left-0 w-full h-full">
			{/* scoreboard */}

			<div className="absolute top-10 left-1/2 transform -translate-x-1/2">
				<Timer time={20} roundNumber={1} />
			</div>

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
				<HudForm />
			</div>
		</div>
	)
}
