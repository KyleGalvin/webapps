define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"slider")
		var socket = require("socket")
		this.view = $('<div class="slider">')

		var slideInPanel = $('<div class="mainPanelSlider">')
		this.view.append(slideInPanel)

		var mainPanel = $('<div class="mainPanel">')
		this.view.append(mainPanel)

		var mainWidget = require('dbAdmin')
		var main = new mainWidget()

		mainPanel.append(main.view)

		var slideIn = function(widgetProto){
			containedWidget = widgetProto
			var newWidget = new containedWidget()
			slideInPanel.append(newWidget.view)

			slideInPanel.animate({
				right: "-=100%"
			},500,function(){
				main.view.empty()
				main.view.append(newWidget.view)
				main.view.css({"left":"0px"})
				slideInPanel.empty()
				slideInPanel.css({"right":"100%"})
			})

			main.view.animate({
				left: "100%"
			},500,function(){
				//swap panels and empty to bring us back to our start state
				$(this).empty()
				$(this).css({
					left:0
				})
				main.view.empty()
				main.view.append(newWidget.view)
				main.view.css({"left":"0px"})
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
				if(message.args[0]=="menu"){
					slideIn(require("menu"))
				}else if(message.args[0]=="trackQueue"){
					slideIn(require("trackQueue"))				
				}else if(message.args[0]=="mapEdit"){
					slideIn(require("mapEdit"))
				}else if(message.args[0]=="playlistQueue"){
					slideIn(require("playlistQueue"))
				}else if(message.args[0]=="dbAdmin"){
					slideIn(require("dbAdmin"))
				}
			}
		}
	}
})
