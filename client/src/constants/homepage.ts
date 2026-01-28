import { Globe, Zap, Trophy } from "lucide-react"
import type { TutorialCard, FAQItem, Review } from "@/types/content"

export const TUTORIAL_CARDS: TutorialCard[] = [
	{
		icon: Globe,
		title: "Trouvez le pays",
		description:
			"Un pays s'affiche sur le globe 3D. Tapez son nom le plus vite possible !",
	},
	{
		icon: Zap,
		title: "La vitesse compte",
		description:
			"15 secondes par round, 20 rounds au total. Plus vous êtes rapide, plus vous gagnez de points.",
	},
	{
		icon: Trophy,
		title: "Devenez une légende",
		description:
			"Jouez solo ou avec vos amis. Les meilleurs scores sont immortalisés dans le classement mondial !",
	},
]

export const FAQ_ITEMS: FAQItem[] = [
	{
		question: "Comment fonctionne le jeu ?",
		answer: "Chaque partie dure 20 rounds de 15 secondes. Un pays s'affiche sur le globe 3D et vous devez taper son nom le plus rapidement possible. Plus vous êtes rapide, plus vous gagnez de points !",
	},
	{
		question: "Puis-je jouer seul ou avec des amis ?",
		answer: "Les deux ! Jouez en solo pour vous entraîner, ou créez une partie multijoueur et invitez vos amis en leur envoyant le lien depuis le lobby. Jusqu'à 8 joueurs peuvent s'affronter !",
	},
	{
		question: "Comment inviter mes amis ?",
		answer: "Créez une partie, puis dans le lobby, copiez le code de la room ou partagez le lien directement. Vos amis pourront rejoindre en quelques clics !",
	},
	{
		question: "Comment apparaître dans le classement mondial ?",
		answer: "À la fin d'une partie, le gagnant est automatiquement ajouté au classement si son score est assez bon. Entraînez-vous et devenez une légende !",
	},
	{
		question: "Les pays sont-ils toujours les mêmes ?",
		answer: "Non ! Chaque partie génère une sélection unique de 20 pays. De plus, la difficulté augmente progressivement : pays faciles en début de partie, pays plus difficiles vers la fin.",
	},
]

export const REVIEWS: Review[] = [
	{
		name: "Marie",
		text: "Super jeu pour réviser sa géographie en s'amusant !",
		rating: 5,
	},
	{
		name: "totoga",
		text: "On joue avec mes collègues pendant la pause déj. L'ambiance est au top !",
		rating: 5,
	},
	{
		name: "pablo45",
		text: "Parfait pour les soirées entre amis. Simple, rapide et addictif !",
		rating: 4,
	},
]
