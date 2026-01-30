-- Games table
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code TEXT NOT NULL,
  player_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Winner leaderboard table
CREATE TABLE winner_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  player_color TEXT NOT NULL,
  winning_score INTEGER NOT NULL,
  players_beaten INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_games_completed_at ON games(completed_at DESC);
CREATE INDEX idx_winner_leaderboard_score ON winner_leaderboard(winning_score DESC);
CREATE INDEX idx_winner_leaderboard_created_at ON winner_leaderboard(created_at DESC);
CREATE INDEX idx_winner_leaderboard_game_id ON winner_leaderboard(game_id);

-- Disable RLS (using service key for security)
ALTER TABLE games DISABLE ROW LEVEL SECURITY;
ALTER TABLE winner_leaderboard DISABLE ROW LEVEL SECURITY;