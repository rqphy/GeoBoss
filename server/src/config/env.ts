import dotenv from "dotenv"

dotenv.config()

const requiredEnvVars = ["SUPABASE_URL", "SUPABASE_SERVICE_KEY"] as const

for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		throw new Error(`Missing required environment variable: ${envVar}`)
	}
}

export const config = {
	port: parseInt(process.env.PORT || "3000", 10),
	nodeEnv: process.env.NODE_ENV || "development",
	supabase: {
		url: process.env.SUPABASE_URL!,
		serviceKey: process.env.SUPABASE_SERVICE_KEY!,
	},
	clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
} as const
