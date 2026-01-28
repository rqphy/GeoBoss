import { useState, useEffect } from "react"
import Experience from "@/components/3d/dot-earth/experience"
import { Canvas } from "@react-three/fiber"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Gamepad2Icon,
	ChevronDown,
	Loader2,
	AlertTriangle,
	HelpCircle,
	Quote,
	Trophy,
	Medal,
	Crown,
} from "lucide-react"
import CreateRoomModal from "@/components/create-room-modal"
import { TUTORIAL_CARDS, FAQ_ITEMS, REVIEWS } from "@/constants/homepage"
import { getTotalGamesCount, getWinnerLeaderboard } from "@/services/api"
import { useSocket } from "@/contexts/socket-context"

interface LeaderboardEntry {
	id: string
	player_name: string
	player_color: string
	winning_score: number
	players_beaten: number
	created_at: string
}

export default function Home() {
	const { isConnected } = useSocket()
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [questionsAnswered, setQuestionsAnswered] = useState<number | null>(
		null,
	)
	const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
	const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const data = await getTotalGamesCount()
				const totalQuestions = (data.total || 0) * 20
				setQuestionsAnswered(totalQuestions + 1200)
			} catch (error) {
				console.error("Failed to fetch statistics:", error)
				setQuestionsAnswered(0)
			}
		}

		const fetchLeaderboard = async () => {
			try {
				const data = await getWinnerLeaderboard(10)
				setLeaderboard(data)
			} catch (error) {
				console.error("Failed to fetch leaderboard:", error)
			} finally {
				setIsLoadingLeaderboard(false)
			}
		}

		fetchStats()
		fetchLeaderboard()
	}, [])

	return (
		<div className="relative bg-black">
			<div className="fixed bottom-0 left-0 w-full h-full">
				<Canvas camera={{ fov: 30, position: [6, 0, 0] }}>
					<Experience />
				</Canvas>
			</div>

			{!isConnected && (
				<div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 text-black py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium animate-in slide-in-from-top duration-300">
					<AlertTriangle className="w-4 h-4" />
					<span>Le serveur se réveille… merci de patienter.</span>
					<Loader2 className="w-4 h-4 animate-spin" />
				</div>
			)}

			<section className="relative flex flex-col items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-8xl md:text-8xl uppercase font-family font-light text-secondary">
						Geoboss
					</h1>
					<Button
						variant="secondary"
						className="hover:cursor-pointer mt-9"
						disabled={!isConnected}
						onClick={() => setIsCreateModalOpen(true)}
					>
						{isConnected ? (
							<>
								Créer une partie
								<Gamepad2Icon />
							</>
						) : (
							<>
								Connexion au serveur...
								<Loader2 className="animate-spin" />
							</>
						)}
					</Button>
				</div>

				<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
					<span className="text-s uppercase font-bold tracking-widest text-secondary">
						Scroll
					</span>
					<ChevronDown className="w-5 h-5 text-secondary" />
				</div>
			</section>

			<section className="relative py-16 px-6">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-light font-family text-secondary text-center mb-12 uppercase tracking-wide">
						Comment jouer ?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{TUTORIAL_CARDS.map((card, index) => (
							<Card
								key={index}
								className="bg-background/5 border-secondary/20 backdrop-blur-sm"
							>
								<CardHeader className="text-center">
									<card.icon className="w-10 h-10 text-secondary mx-auto mb-3" />
									<CardTitle className="text-secondary text-xl">
										{card.title}
									</CardTitle>
									<CardDescription className="text-secondary/70 text-sm leading-relaxed">
										{card.description}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
					<div className="flex justify-center">
						<Button
							variant="secondary"
							className="hover:cursor-pointer mt-9"
							disabled={!isConnected}
							onClick={() => setIsCreateModalOpen(true)}
						>
							{isConnected ? (
								<>
									Créer une partie
									<Gamepad2Icon />
								</>
							) : (
								<>
									Connexion au serveur...
									<Loader2 className="animate-spin" />
								</>
							)}
						</Button>
					</div>
				</div>
			</section>

			<section className="relative py-16 px-6">
				<div className="max-w-3xl mx-auto text-center">
					<div className="bg-secondary/5 border border-secondary/20 backdrop-blur-sm rounded-2xl p-10">
						<p className="text-6xl md:text-7xl font-bold text-secondary mb-4">
							{questionsAnswered === null ? (
								<Loader2 className="w-16 h-16 animate-spin mx-auto" />
							) : (
								questionsAnswered.toLocaleString()
							)}
						</p>
						<p className="text-xl text-secondary/70 uppercase tracking-widest">
							Questions répondues
						</p>
					</div>
				</div>
			</section>

			<section className="relative py-16 px-6">
				<div className="max-w-3xl mx-auto">
					<div className="flex items-center justify-center gap-3 mb-12">
						<Trophy className="w-8 h-8 text-secondary" />
						<h2 className="text-3xl md:text-4xl font-light font-family text-secondary text-center uppercase tracking-wide">
							Classement Mondial
						</h2>
					</div>

					{isLoadingLeaderboard ? (
						<div className="flex justify-center items-center py-12">
							<Loader2 className="w-12 h-12 animate-spin text-secondary" />
						</div>
					) : leaderboard.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-secondary/70 text-lg">
								Aucune partie terminée pour le moment.
							</p>
							<p className="text-secondary/50 text-sm mt-2">
								Soyez le premier à marquer l'histoire !
							</p>
						</div>
					) : (
						<div className="bg-secondary/5 border border-secondary/20 backdrop-blur-sm rounded-2xl overflow-hidden">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-secondary/10 border-b border-secondary/20">
										<tr>
											<th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
												Rang
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold text-secondary uppercase tracking-wider">
												Joueur
											</th>
											<th className="px-6 py-4 text-center text-sm font-semibold text-secondary uppercase tracking-wider">
												Score
											</th>
											<th className="px-6 py-4 text-center text-sm font-semibold text-secondary uppercase tracking-wider hidden md:table-cell">
												Adversaires battus
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-secondary/10">
										{leaderboard.map((entry, index) => {
											const rank = index + 1
											const rankIcon =
												rank === 1 ? (
													<Crown className="w-5 h-5 text-yellow-400" />
												) : rank === 2 ? (
													<Medal className="w-5 h-5 text-gray-300" />
												) : rank === 3 ? (
													<Medal className="w-5 h-5 text-amber-600" />
												) : null

											return (
												<tr
													key={entry.id}
													className="hover:bg-secondary/5 transition-colors"
												>
													<td className="px-6 py-4">
														<div className="flex items-center gap-2">
															{rankIcon || (
																<span className="text-secondary/70 font-medium w-5 text-center">
																	{rank}
																</span>
															)}
														</div>
													</td>
													<td className="px-6 py-4">
														<div className="flex items-center gap-3">
															<div
																className="w-4 h-4 rounded-full border-2 border-secondary/30"
																style={{
																	backgroundColor:
																		entry.player_color,
																}}
															/>
															<span className="text-secondary font-medium">
																{
																	entry.player_name
																}
															</span>
														</div>
													</td>
													<td className="px-6 py-4 text-center">
														<span className="text-secondary font-bold text-lg">
															{
																entry.winning_score
															}
														</span>
													</td>
													<td className="px-6 py-4 text-center hidden md:table-cell">
														<span className="text-secondary/70">
															{
																entry.players_beaten
															}
														</span>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
				<div className="flex justify-center">
					<Button
						variant="secondary"
						className="hover:cursor-pointer mt-9"
						disabled={!isConnected}
						onClick={() => setIsCreateModalOpen(true)}
					>
						{isConnected ? (
							<>
								Créer une partie
								<Gamepad2Icon />
							</>
						) : (
							<>
								Connexion au serveur...
								<Loader2 className="animate-spin" />
							</>
						)}
					</Button>
				</div>
			</section>

			<section className="relative py-16 px-6">
				<div className="max-w-3xl mx-auto">
					<div className="flex items-center justify-center gap-3 mb-12">
						<HelpCircle className="w-8 h-8 text-secondary" />
						<h2 className="text-3xl md:text-4xl font-light font-family text-secondary text-center uppercase tracking-wide">
							FAQ
						</h2>
					</div>
					<Accordion type="single" collapsible className="space-y-4">
						{FAQ_ITEMS.map((item, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="bg-secondary/5 border border-secondary/20 backdrop-blur-sm rounded-lg px-6"
							>
								<AccordionTrigger className="text-secondary hover:text-secondary/80 text-left">
									{item.question}
								</AccordionTrigger>
								<AccordionContent className="text-secondary/70">
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			<section className="relative py-16 px-6 pb-32">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-center justify-center gap-3 mb-12">
						<Quote className="w-8 h-8 text-secondary" />
						<h2 className="text-3xl md:text-4xl font-light font-family text-secondary text-center uppercase tracking-wide">
							Ils adorent GeoBoss
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{REVIEWS.map((review, index) => (
							<Card
								key={index}
								className="bg-secondary/5 border-secondary/20 backdrop-blur-sm"
							>
								<CardHeader>
									<div className="flex gap-1 mb-2">
										{[...Array(5)].map((_, i) => (
											<span
												key={i}
												className={`text-lg ${
													i < review.rating
														? "text-yellow-400"
														: "text-secondary/30"
												}`}
											>
												★
											</span>
										))}
									</div>
									<CardDescription className="text-secondary/70 text-sm leading-relaxed italic mb-3">
										"{review.text}"
									</CardDescription>
									<CardTitle className="text-secondary text-base">
										— {review.name}
									</CardTitle>
								</CardHeader>
							</Card>
						))}
					</div>
					<div className="flex justify-center">
						<Button
							variant="secondary"
							className="hover:cursor-pointer mt-9"
							disabled={!isConnected}
							onClick={() => setIsCreateModalOpen(true)}
						>
							{isConnected ? (
								<>
									Créer une partie
									<Gamepad2Icon />
								</>
							) : (
								<>
									Connexion au serveur...
									<Loader2 className="animate-spin" />
								</>
							)}
						</Button>
					</div>
				</div>
			</section>

			<footer className="relative py-8 px-6 border-t border-secondary/10">
				<div className="max-w-5xl mx-auto">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-secondary text-sm">
						<div className="flex items-center gap-2">
							<span>© {new Date().getFullYear()} GeoBoss</span>
							<span className="hidden md:inline">•</span>
							<span className="text-secondary">v2.0.0</span>
						</div>
						<div className="flex items-center gap-2">
							<span>Made with</span>
							<span className="text-red-500 animate-pulse">
								❤️
							</span>
							<span>by</span>
							<a
								href="https://github.com/rqphy"
								target="_blank"
								rel="noopener noreferrer"
								className="text-secondary hover:text-secondary/80 transition-colors underline underline-offset-4"
							>
								Raphaël
							</a>
						</div>
					</div>
				</div>
			</footer>

			<CreateRoomModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
		</div>
	)
}
