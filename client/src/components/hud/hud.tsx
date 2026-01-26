import HudForm from "./form"
import Scoreboard from "./scoreboard"
import Timer from "./timer"
import Answer from "./answer"
import WrongAnswerBackground from "./wrong-answer-background"
import { useSocket } from "@/contexts/socket-context"

export default function Hud() {
	const {
		timeLimit,
		currentRound,
		playersList,
		correctAnswer,
		roundWinner,
		isRoundActive,
		answerFeedback,
		hasFoundAnswer,
		wrongAnswers,
		submitAnswer,
	} = useSocket()
	return (
		<div className="fixed top-0 left-0 w-full h-full z-50">
			<WrongAnswerBackground
				wrongAnswers={wrongAnswers}
				playersList={playersList}
			/>

			<div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-auto">
				<Scoreboard playersList={playersList} />
			</div>

			<div className="absolute top-10 left-1/2 -translate-x-1/2">
				<Timer
					totalTime={timeLimit}
					roundNumber={currentRound}
					isRoundActive={isRoundActive}
				/>
			</div>

			<div className="absolute bottom-10 left-1/2 -translate-x-1/2">
				<HudForm
					submitAnswer={submitAnswer}
					answerFeedback={answerFeedback}
					disabled={hasFoundAnswer}
				/>
			</div>

			{correctAnswer && !isRoundActive && (
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2">
					<Answer
						correctAnswer={correctAnswer}
						roundWinner={roundWinner}
					/>
				</div>
			)}
		</div>
	)
}
