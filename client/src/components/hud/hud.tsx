import HudForm from "./form"
import Scoreboard from "./scoreboard"
import Timer from "./timer"

export default function Hud() {
	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
			<div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-auto">
				<Scoreboard />
			</div>

			<div className="absolute top-10 left-1/2 transform -translate-x-1/2">
				<Timer totalTime={20} roundNumber={1} />
			</div>

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
				<HudForm />
			</div>
		</div>
	)
}
