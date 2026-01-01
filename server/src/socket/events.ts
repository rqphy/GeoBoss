export const SOCKET_EVENTS = {
	// connection events
	CONNECTION: "connection",
	CONNECT: "connect",
	DISCONNECTION: "disconnect",

	// room events
	// client emits
	CREATE_ROOM: "create_room",
	JOIN_ROOM: "join_room",
	LEAVE_ROOM: "leave_room",
	// server emits
	ROOM_CREATED: "room_created",
	PLAYER_JOINED: "player_joined",
	PLAYER_LEFT: "player_left",

	// game events
	// client emits
	START_GAME: "start_game",
	SUBMIT_ANSWER: "submit_answer",
	// server emits
	GAME_STARTED: "game_started",
	END_GAME: "end_game",
	NEW_ROUND: "new_round",
	END_ROUND: "end_round",
	GOOD_ANSWER: "good_answer",
	BAD_ANSWER: "bad_answer",

	ERROR: "error",
}
