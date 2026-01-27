import { createClient } from "@supabase/supabase-js"
import { config } from "../config/env.js"
import type { Database } from "../types/database.types.js"

const supabase = createClient<Database>(
	config.supabase.url!,
	config.supabase.serviceKey!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
)

export default supabase
