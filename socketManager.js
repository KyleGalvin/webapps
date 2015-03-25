module.exports={
		init : function(httpServer, connections){

			//socket.io for realtime websocket connections
			var io = require('socket.io').listen(httpServer,{log:false})
			var bluebird = require('bluebird')
			//dispatcher handles incoming requests from socket.io
			var dispatcher = require("./dispatcher")

			io.sockets.on('connection',function(socket){
				console.log("socket id ", socket.id)
				connections[socket.id] =socket
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
				socket.send(JSON.stringify({message:{address:socket.id},header:{widgetID:1}}))
				//dispatcher.call("add_session",socket.id, [socket])
			})
			
		},
		write :function(destination,message){
			
		}
}
