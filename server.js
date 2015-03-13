
/*
	boostrap our server
*/

//express for server routing and virtual paths
var express = require("express")
var app = express()
var bluebird = require('bluebird')
//configure web app, detailing express.js features and defining local file locations
app.use(express.static(__dirname + '/public'))
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'ejs' )
//app.set('bookshelf', bookshelf)
 
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}
 
app.use(allowCrossDomain)

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
 
// parse application/json
app.use(bodyParser.json())
 
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
 
//serve our index.html page when the user requests the root of our webserver
app.get('/',function(req,res){
	console.log('index')
	res.render('index')
})

//configure web server with settings defined above
var server = require('http').createServer(app)
// var BinaryServer = require('binaryjs').BinaryServer
// var BServer = BinaryServer({port: 9000})
//begin our configured webserver
server.listen(8080, function(){console.log('server listening')})


var websocketSingleton = require("websocket")
var websocket = new websocketSingleton()
websocket.init(server)
/*
//socket.io for realtime websocket connections
var io = require('socket.io').listen(server,{log:false})

//dispatcher handles incoming requests from socket.io
var dispatcher = require("./dispatcher")

io.sockets.on('connection',function(socket){
	console.log("incoming connection")
	//put these into the object model instead
	//sessions[socket.id] = {}
	//sessions[socket.id].created = new Date()
	//sessions[socket.id].socket = socket


	socket.on('message',function(data){
		//var reactor = require("./reactor")
		console.log("incoming Data:",data)

		// var response

		// //set up behavior for when our dispatcher completes the request
		// reactor.on('socket_open',function(){
			
		// })

		bluebird.props({
			message : dispatcher.call(data.command,0,data.args,data.header)
		}).then(function(response){
			packet = {message:response.message,header:data.header}
			console.log("dispatcher then response:",packet)
			socket.send(JSON.stringify(packet))	
		})

	})

	socket.on('disconnect', function(){
		console.log("disconnecting:",socket.id)	
	})

	//dispatcher.call("add_session",socket.id, [socket])
})

*/
