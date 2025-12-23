export const SOCKET_EVENTS = {
	CONNECTION: "connection",
	DISCONNECTION: "disconnect",

	CREATE_ROOM: "create_room",
	JOIN_ROOM: "join_room",
	LEAVE_ROOM: "leave_room",
	PLAYER_JOINED: "player_joined",
	PLAYER_LEFT: "player_left",
	ROOM_CREATED: "room_created",

	START_GAME: "start_game",
	GAME_STARTED: "game_started",
	END_GAME: "end_game",
	NEW_ROUND: "new_round",
	END_ROUND: "end_round",
    SUBMIT_ANSWER: "submit_answer",
    GOOD_ANSWER: "good_answer",
    BAD_ANSWER: "bad_answer",
    
    ERROR: "error"
}
