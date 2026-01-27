const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

export async function getWinnerLeaderboard(limit: number = 10) {
	const response = await fetch(`${API_URL}/api/leaderboard?limit=${limit}`)
	if (!response.ok) {
		throw new Error(
			`Failed to fetch winner leaderboard: ${response.statusText}`,
		)
	}
	return response.json()
}

export async function getTotalGamesCount() {
	const response = await fetch(`${API_URL}/api/stats/total-games`)
	if (!response.ok) {
		throw new Error(
			`Failed to fetch total games count: ${response.statusText}`,
		)
	}
	return response.json()
}
