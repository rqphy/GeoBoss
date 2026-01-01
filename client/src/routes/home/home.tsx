import { useState } from "react"
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
} from "lucide-react"
import CreateRoomModal from "@/components/create-room-modal"
import { TUTORIAL_CARDS, FAQ_ITEMS, REVIEWS } from "@/constants/homepage"

export default function Home() {
	// TODO: Get connection state from socket
	const isConnected = true
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

	return (
		<>
			<div className="fixed bottom-0 left-0 w-full h-full">
				<Canvas camera={{ fov: 30, position: [6, 0, 0] }}>
					<Experience />
				</Canvas>
			</div>
			{!isConnected && (
				<div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 text-black py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium animate-in slide-in-from-top duration-300">
					<AlertTriangle className="w-4 h-4" />
					<span>
						Connexion au serveur en cours... Veuillez patienter.
					</span>
					<Loader2 className="w-4 h-4 animate-spin" />
				</div>
			)}

			<section className="flex flex-col items-center justify-center h-screen bg-black">
				<div className="text-center z-10">
					<h1 className="text-8xl md:text-8xl uppercase font-family font-light text-secondary">
						GEOQUIZ
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

			{/* Tutorial Cards */}
			<section className="bg-black py-16 px-6">
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
				</div>
			</section>

			{/* Statistics Counter */}
			<section className="bg-black py-16 px-6">
				<div className="max-w-3xl mx-auto text-center">
					<div className="bg-secondary/5 border border-secondary/20 backdrop-blur-sm rounded-2xl p-10">
						<p className="text-6xl md:text-7xl font-bold text-secondary mb-4">
							1200+
						</p>
						<p className="text-xl text-secondary/70 uppercase tracking-widest">
							Questions répondues
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="bg-black py-16 px-6">
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

			{/* Reviews Section */}
			<section className="bg-black py-16 px-6 pb-32">
				<div className="max-w-5xl mx-auto">
					<div className="flex items-center justify-center gap-3 mb-12">
						<Quote className="w-8 h-8 text-secondary" />
						<h2 className="text-3xl md:text-4xl font-light font-family text-secondary text-center uppercase tracking-wide">
							Ils adorent GeoQuiz
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
				</div>
			</section>

			<CreateRoomModal
				open={isCreateModalOpen}
				onOpenChange={setIsCreateModalOpen}
			/>
		</>
	)
}
