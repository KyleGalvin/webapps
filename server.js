
/*
	boostrap our server
*/
function main(){
	var bluebird = require('bluebird')

	var webrouting = require('./expressManager').getConfig()

	//configure web server with settings defined above
	var webserver = require('http').createServer(webrouting)
	// var BinaryServer = require('binaryjs').BinaryServer
	// var BServer = BinaryServer({port: 9000})
	//begin our configured webserver
	webserver.listen(8080, function(){console.log('server listening')})


	var websocket = require("./socketManager")
	websocket.init(webserver,{})

}
main()
