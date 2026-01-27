import supabase from "./supabase.js"

interface SaveWinnerData {
	roomCode: string
	playerCount: number
	winner: {
		name: string
		color: string
		score: number
	}
}

export async function saveWinner(data: SaveWinnerData) {
	const { data: game, error: gameError } = await supabase
		.from("games")
		.insert({
			room_code: data.roomCode,
			player_count: data.playerCount,
			completed_at: new Date().toISOString(),
		})
		.select()
		.single()

	if (gameError) {
		throw new Error(`Error saving game: ${gameError.message}`)
	}

	const { data: winner, error: winnerError } = await supabase
		.from("winner_leaderboard")
		.insert({
			game_id: game.id,
			player_name: data.winner.name,
			player_color: data.winner.color,
			winning_score: data.winner.score,
			players_beaten: data.playerCount,
		})
		.select()
		.single()

	if (winnerError) {
		throw new Error(`Error saving winner: ${winnerError.message}`)
	}

	return { game, winner }
}

export async function getWinnerLeaderboard(limit: number = 10) {
    const { data, error } = await supabase
    .from("winner_leaderboard")
    .select("*")
    .order("winning_score", { ascending: false })
    .limit(limit)

    if (error) {
        throw new Error(`Error getting winner leaderboard: ${error.message}`)
    }

    return data
}

export async function getTotalGamesCount() {
    const { count, error } = await supabase
    .from("games")
    .select("*", { count: "exact", head: true })
    .not("completed_at", "is", null)

    if (error) {
        throw new Error(`Error getting total games: ${error.message}`)
    }

    return count
}