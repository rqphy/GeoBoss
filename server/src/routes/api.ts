import express from "express"
import {
	getWinnerLeaderboard,
	getTotalGamesCount,
} from "../services/game-service.js"
import supabase from "../services/supabase.js"
const router = express.Router()

router.get("/leaderboard", async (req, res) => {
	try {
		const limit = parseInt(req.query.limit as string) || 10
		const leaderboard = await getWinnerLeaderboard(limit)
		res.json(leaderboard)
	} catch (error) {
		console.error("Error getting winner leaderboard:", error)
		res.status(500).json({ error: "Failed to fetch leaderboard" })
	}
})

router.get("/stats/total-games", async (req, res) => {
	try {
		const total = await getTotalGamesCount()
		res.json({ total })
	} catch (error) {
		console.error("Error getting total games count:", error)
		res.status(500).json({ error: "Failed to fetch total games count" })
	}
})

router.get("/health", async (req, res) => {
	try {
		await supabase.from("games").select("id").limit(1)
		res.json({ status: "ok", db: "connected" })
	} catch (error) {
		console.error("Error getting health:", error)
		res.status(500).json({ error: "Failed to fetch health" })
	}
})

export default router
