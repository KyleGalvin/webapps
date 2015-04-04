define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"slider")
		var socket = require("socket")
		this.view = $('<div class="slider">')

		var mainPanel = $('<div>')
		this.view.append(mainPanel)

		var mainWidget = require('dbAdmin')
		var main = new mainWidget()

		mainPanel.append(main.view)

		console.log('create children ',$('.slider').children())

		var slideIn = function(widgetProto){
			var newWidget = new widgetProto()
			$('.slider').prepend($('<div>').append(newWidget.view).css({position:'relative',width:'100%',height:'100%',left:'-100%'}))
			var children = $('.slider').children()
			var children = $('.slider').children()
			$(children[0]).animate({
				left:0
			},500,function(){
				var children = $('.slider').children()
				$(children[1]).remove()
				console.log('children ', children)
			})
		}

		this.handleMessage = function(message){
			console.log("main recieved message:",message)
			if(message.command == "navigate"){
				var request = {}
				request.command = "toggleMenu"
				request.header = {id:'local',widgetName:"main"}
				request.args = []
				socket.write(request)	
				require([message.args[0]],slideIn)
			}
		}
	}
})
