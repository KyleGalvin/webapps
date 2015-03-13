define(function(require){
	var instance = null
    function MySingleton(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()")
        }
        this.initialize()
    }
    MySingleton.prototype = {



        initialize: function(){
		this.connections = {}
		this.init = function(httpServer){

			//socket.io for realtime websocket connections
			var io = require('socket.io').listen(httpServer,{log:false})

			//dispatcher handles incoming requests from socket.io
			var dispatcher = require("./dispatcher")

			io.sockets.on('connection',function(socket){
				console.log("incoming connection",socket)
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

				//dispatcher.call("add_session",socket.id, [socket])
			})
			
		}
		this.write =function(destination,message){
			
		}


//			var socket = null
//			var widgetRegistry = require("widgetRegistry")
/*
			this.init = function(ip,port,reactor){
				// var BinaryClient = require("binary")
				// BSocket = new BinaryClient('ws://'+ip+':'+port)
				socket = io.connect('http://'+ip+":"+port)
				socket.on('message', function(data,callback){
					data = $.parseJSON(data)
					console.log("handling message:",data)
					var destinationWidget = widgetRegistry.lookupID(data.header.id)
					console.log("message handled by: ",destinationWidget)
					destinationWidget.handleMessage(data.message)
					//messageDestination.handleMessage(data)
				})
				socket.on('error',function(){
					console.log("client socket error!")
				})
				socket.on('connect',function(data){
					console.log('client is connected',data)
					reactor.trigger('socket_open')
				})
				socket.on('disconnect',function(){
					console.log('client disconnected')
				})
			}

			this.write = function(json){
				//use the json packet header to determine if the message
				//should be routed to the server, a local widget, or a peer machine
				console.log("in socket write...",json)
				if(json.header){
					if(json.header.session && json.header.session == 'local'){
						if(json.header.widgetName){
							var destination = widgetRegistry.lookupName(json.header.widgetName)
							destination[0].handleMessage(json)
						}else if(json.header.widgetID){
							var destination = widgetRegistry.lookupID(json.header.widgetID)
							destination[0].handleMessage(json)
						}
						
					}else{
						if(json.command){
							console.log('writing message:',json)
							socket.emit('message',json)
						}else{
							console.log("message has no command!",json)
						}							
					}
	
				}else{
					console.log("message has no header!",json)
				}
			}
*/			return this
		}
    }
    MySingleton.getInstance = function(){
        // summary:
        //      Gets an instance of the singleton. It is better to use 
        if(instance === null){
            instance = new MySingleton()
        }
        return instance
    }
    return MySingleton.getInstance()
})
