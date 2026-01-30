# Database Setup & migration instructions

## Initial Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Go to SQL Editor and run `schema.sql`

3. Copy your credentials:
    - Project URL: `https://xxxxx.supabase.co`
    - Service Role Key: Settings → API → service_role

4. Add to `server/.env`:

```bash
   SUPABASE_URL=your-project-url
   SUPABASE_SERVICE_KEY=your-service-role-key
```

## Reset Database

To drop all tables and start fresh, run:

```sql
DROP TABLE IF EXISTS winner_leaderboard CASCADE;
DROP TABLE IF EXISTS games CASCADE;
```

Then re-run `schema.sql`.

## Queries

### Get top 10 winners

```sql
SELECT player_name, winning_score, players_beaten
FROM winner_leaderboard
ORDER BY winning_score DESC
LIMIT 10;
```

### Total games played

```sql
SELECT COUNT(*) FROM games WHERE completed_at IS NOT NULL;
```
