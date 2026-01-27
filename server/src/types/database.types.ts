// server/src/types/database.types.ts
export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			games: {
				Row: {
					id: string
					room_code: string
					player_count: number
					created_at: string
					completed_at: string | null
				}
				Insert: {
					id?: string
					room_code: string
					player_count: number
					created_at?: string
					completed_at?: string | null
				}
				Update: {
					id?: string
					room_code?: string
					player_count?: number
					created_at?: string
					completed_at?: string | null
				}
				Relationships: []
			}
			winner_leaderboard: {
				Row: {
					id: string
					game_id: string
					player_name: string
					player_color: string
					winning_score: number
					players_beaten: number
					created_at: string
				}
				Insert: {
					id?: string
					game_id: string
					player_name: string
					player_color: string
					winning_score: number
					players_beaten: number
					created_at?: string
				}
				Update: {
					id?: string
					game_id?: string
					player_name?: string
					player_color?: string
					winning_score?: number
					players_beaten?: number
					created_at?: string
				}
				Relationships: [
					{
						foreignKeyName: "winner_leaderboard_game_id_fkey"
						columns: ["game_id"]
						isOneToOne: false
						referencedRelation: "games"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
