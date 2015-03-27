/*
	boostrap our server
*/
function main(){
	//Resolve circular dependencies with dedpendency injection (Inversion of Control) as we start the major components of our server
	var dispatcher = require("./dispatcher")
	var websocket = require("./socketManager")
	websocket.init(dispatcher)
	dispatcher.init(websocket)
}
main()
