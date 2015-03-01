define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"queueHeader")
		var socket = require("socket")
		this.view = $('<div class="header">').text('Upload Queue')
		this.handleMessage = function(message){
		}

		// var menuButton = $('<div>').text("menu")
		// 	.css({
		// 		float:'left',
		// 		height:'100%',
		// 		'background-color':'#210'

		// 	}).click(function(){
		// 		var request = {}
		// 		request.command = "navigate"
		// 		request.header = {id:id,session:'local',widgetName:""}
		// 		request.args = ["menu"]
		// 		socket.write(request)				
		// 	})

		// this.view.append(menuButton)

	}
})