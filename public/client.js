var socket
define(function(require){

	var server = 'localhost'
	var port = 8080

	var $ = require("jquery")
	var socket = require("socket")
	var reactor = require("reactor")
	
	//use promises to force the application to load in the proper order, chaining startup dependencies
	$.when($(document).ready())//first the html page needs to finish downloading from the server
	.then(function(){//then we need to create our websocket API and upgrade to a real-time full-duplex connection

		//we use an reactor pattern so we can launch an event handler 
		//when our socket handshake is complete and we have established a connection
		var eventReactor = new reactor()

		//set up behavior for when our socket connection opens
		eventReactor.on('socket_open',function(){
			var mainWidget = require("mainWidget")
			var main = new mainWidget()
			console.log("main",main)
			$("body").append(main.view)
		})

		//create our socket object and connect to remote webserver
		//our constructor parameters define the remote websocket server
		//we also send in our event system to alert us when the socket is open
		//this event trigger will begin our mainWidget initialization
		socket.init(server,port,eventReactor)

	})
})