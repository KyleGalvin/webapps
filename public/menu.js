define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"menu")
		var socket = require("socket")
		this.view = $('<div class="menu">')

		this.handleMessage = function(message){

		}
		var menuContainer = $('<div class="menuContainer">')
		this.view.append(menuContainer)

		var trackQueue = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "navigate"
			request.header = {id:'local',widgetName:"slider"}
			request.args = ["trackQueue"]
			socket.write(request)			
		}).text("Uploaded Track Queue")

		var imageUpload = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "navigate"
			request.header = {id:'local',widgetName:"slider"}
			request.args = ["imageQueue"]
			socket.write(request)			
		}).text("Uploaded Image Queue")

		var mapEdit = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "navigate"
			request.header = {id:'local',widgetName:"slider"}
			request.args = ["mapEdit"]
			socket.write(request)			
		}).text("Edit Map")

		var playlistQueue = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "navigate"
			request.header = {id:'local',widgetName:"slider"}
			request.args = ["playlistQueue"]
			socket.write(request)			
		}).text("Playlist Queue")

		var dbAdmin = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "navigate"
			request.header = {id:'local',widgetName:"slider"}
			request.args = ["dbAdmin"]
			socket.write(request)			
		}).text("Database Admin Panel")

		menuContainer.append(trackQueue)
		menuContainer.append(mapEdit)
		menuContainer.append(playlistQueue)
		menuContainer.append(dbAdmin)
		menuContainer.append(imageUpload)

	}
})
