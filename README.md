# GeoBoss

> A real-time multiplayer geography quiz game with an interactive 3D globe

![GeoBoss](https://juq1maqrjs.ufs.sh/f/r1m4dnkvsK4QAM3g2v48a7oTHYRbPiGlCf2FqW4D9sgeUnXw)

## The Idea

Some of you might have played **GeoQuiz**, a project I created in 2024 to explore WebSockets. The original game was a simple quiz where you could play with friends by creating a room—each round, you'd guess either a country name or its capital.

After seeing a Twitter post showcasing a 3D globe with interactive countries, I was inspired to rebuild GeoQuiz from the ground up. This time with a fully interactive 3D experience and refined gameplay: **identify highlighted countries on a rotating globe before time runs out**.

## Features

### 🎮 Gameplay

- **Real-time multiplayer** - Create rooms and invite friends with a simple code or link
- **20 rounds of fast-paced geography** - 15 seconds per round
- **Dynamic difficulty** - Countries progress from easy to challenging
- **Live scoreboard** - See scores update in real-time
- **Wrong answer display** - Failed guesses appear on screen in player colors (so you can make fun of your friends :) )
- **Winner leaderboard** - Compete for the top spot globally

### 🌐 Technical Highlights

- **Interactive 3D globe** - Built with React Three Fiber and GeoJSON
- **Real-time communication** - Socket.IO for multiplayer gameplay
- **Persistent data** - Supabase for game history and leaderboards
- **Smart country highlighting** - Automatic markers for small countries (Monaco, Vatican, etc.)
- **Fuzzy matching** - Accepts variations like "USA", "US", "United States"

## Tech Stack

**Frontend:**

- React + TypeScript
- React Three Fiber (3D rendering)
- React Three Drei (3D helpers)
- Socket.IO Client
- React Router
- Vite

**Backend:**

- Node.js + Express
- Socket.IO
- Supabase (PostgreSQL)
- TypeScript

## Architecture

### Key Components

**Frontend**

```
client/src/
├── contexts/
│   └── socket-context.tsx     # Centralized socket state management
├── components/
│   ├── game-earth/            # 3D globe with country highlighting
│   └── hud/
├── routes/
│   ├── home/                  # Lobby creation/joining
│   ├── lobby/                 # Pre-game waiting room
│   ├── game/                  # Main game view
│   └── results/               # Post-game leaderboard
└── services/
    └── api.ts                 # REST API calls

```

**Backend**

```
server/src/
├── socket/
│   ├── handlers.ts            # Socket event handlers
│   └── events.ts              # Event constants
├── game/
│   ├── game-room.ts           # Room state & game logic
│   ├── game-logic.ts          # Scoring & validation
│   └── countries.ts           # Country data & selection
├── services/
│   ├── supabase.ts            # Database client
│   └── game-service.ts        # Database operations
└── routes/
    └── api.ts                 # REST endpoints

```

## Key Technical Decisions

### Socket Context Pattern

Instead of using sockets directly in components, all socket logic is centralized in `socket-context`. This provides:

- Single source of truth for game state
- Automatic cleanup of event listeners
- Easy state sharing across components
- Separation of concerns (UI vs. network logic)

### Server-Authoritative Game Logic

All game logic runs on the server in the `GameRoom` class:

- Prevents cheating (score manipulation, timer hacks)
- Ensures all players see consistent state
- Server validates all answers and calculates scores
- Clients are just "views" that display server state

### 3D Globe Rendering

Countries are rendered using GeoJSON data converted to Three.js meshes:

- Large countries: Highlighted with color changes
- Small countries (Monaco, Vatican): Pulsing markers
- Camera auto-focuses on the target country each round
- Smooth animations using GSAP

### Database Schema

Winner-only leaderboard approach:

- Only game winners are saved to reduce database size
- Shows "best games ever played" globally
- Works perfectly with anonymous players (no accounts needed)
- Simple 2-table schema: `games` + `winner_leaderboard`

### Anonymous Player Design

No authentication required:

- Players identified by name + color per game
- Enables instant play without friction
- Leaderboard tracks individual game performances
- Can add optional auth later without breaking existing flow

## Installation

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (free tier works)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/rqphy/GeoBoss.git
cd GeoBoss

```

2. **Install dependencies**

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install

```

3. **Set up Supabase**

- Create a new project at [supabase.com](https://supabase.com/)
- Run the SQL schema from `server/database/schema.sql`
- Copy your project URL and service key

4. **Configure environment variables**

```bash
# server/.env
PORT=3000
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-service-key
CLIENT_URL=http://localhost:5173

```

```bash
# client/.env
VITE_SERVER_URL=http://localhost:3000

```

5. **Run the application**

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev

```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## What I Learned

### 3D Globe from GeoJSON

Transforming flat GeoJSON coordinates into a 3D globe taught me more about spherical mathematics and Three.js performance than I expected. The biggest challenge wasn't the coordinate conversion—it was rendering 195+ countries efficiently without killing the frame rate. I learned to heavily rely on React’s `useMemo` for caching geometry to avoid memory leaks and frame drops.

### The GameRoom Class

Building `GameRoom` as a server-authoritative system completely changed how I think about multiplayer state management. Instead of trusting client state, everything happens on the server: validation, scoring, timing. The clients are just views displaying what the server tells them. The hardest part was handling edge cases: admin disconnections, late answers, network hiccups. I learned that in multiplayer games, you can't assume anything about client behavior. Always validate server-side, always send complete state updates, and design for the chaos of real users doing unexpected things.

### Socket Context Pattern

A centralized `SocketContext` was a game-changer. All socket logic lives in one place, components just consume state and call clean methods like `createRoom()` or `submitAnswer()`. No component knows sockets exist. This separation made debugging so much easier. Every state change traces back to a single event handler. The cleanup is critical too, properly removing listeners in `useEffect` cleanup functions saved me from subtle bugs where old handlers would fire alongside new ones.

### Embracing Simplicity

I almost over-engineered the player tracking system with fingerprinting and complex identity resolution. Then I realized: who cares? Players are anonymous, games are short, and trying to track "the same player" across sessions added massive complexity for little value. Most player don’t want to sign up or login to play such a simple game. The goal is to open the site and play with your friends with as little interaction as possible. Switching to a simple "winner-only leaderboard" that tracks individual game performances simplified everything. No auth, no accounts, instant play. Sometimes the best architecture is the one that does less.

## Resources & Inspiration

**3D Globe**

- [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js examples](https://threejs.org/examples/)
- [Natural Earth GeoJSON data](https://www.naturalearthdata.com/)
- [Brody Smith 3D Globe](https://x.com/__brodysmith/status/1876792159732486497)

**Halftone dots effect**

- [Deadrabbbbit Halftone dots effect](https://x.com/deadrabbbbit/status/1889670401401159848?s=20)

**Multiplayer Architecture**

- [Socket.IO documentation](https://socket.io/docs/v4/)
- [Building real-time games with Socket.IO](https://socket.io/get-started/private-messaging-part-1/)

**Design Inspiration**

- Original GeoQuiz game
- [Seterra Geography](https://www.seterra.com/)
- [Jetpunk](https://www.jetpunk.com/)

**Libraries Used**

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [React Three Drei](https://github.com/pmndrs/drei) - 3D helpers
- [GSAP](https://greensock.com/gsap/) - Animations
- [Supabase](https://supabase.com/) - Backend & database

Inspired by the geography enthusiasts who still know where countries are without Google Maps.
