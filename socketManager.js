var connections={}

module.exports={
		getConnection : function(address){
			//console.log('grabbing connections from table',address,connections[address])
			return connections[address]
		},
		init : function(httpServer,dispatcher){

			//socket.io for realtime websocket connections
			var io = require('socket.io').listen(httpServer,{log:false})
			var bluebird = require('bluebird')
			io.sockets.on('connection',function(socket){
				console.log("socket id ", socket.id)
				connections[socket.id] =socket

				socket.on('message',function(data){
					console.log("incoming Data:",data)

					bluebird.props({
						message : dispatcher.call(data)
					}).then(function(response){
						if(response.message){
							console.log("response",response)
							packet = {message:response.message,header:data.header}
							console.log("dispatcher then response:",packet)
							socket.send(JSON.stringify(packet))	
						}
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
