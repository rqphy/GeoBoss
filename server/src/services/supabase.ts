import { createClient } from "@supabase/supabase-js"
import { config } from "../config/env.js"

const supabase = createClient(config.supabase.url, config.supabase.serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
})

export default supabase