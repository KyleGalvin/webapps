define(function(require){
	return function(){

		var id = require("widgetRegistry").register(this,"log")
		var socket = require("socket")
		this.view = $('<div class="main">')
		this.handleMessage = function(message){
			console.log('message bus:',message)
		}

		var subscriptionRequest = {}
		subscriptionRequest.header = {}
		subscriptionRequest.header.widgetID = id
		subscriptionRequest.command = 'subscribe'
		subscriptionRequest.args = []
		console.log("writing sub request",subscriptionRequest)
		socket.write(subscriptionRequest)
	}
})
