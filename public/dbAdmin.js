define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"dbAdmin")
		var socket = require("socket")
		this.view = $('<div class="menu">')

		this.handleMessage = function(message){

		}
		var menuContainer = $('<div class="menuContainer">')
		this.view.append(menuContainer)

		var tracks = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "clearDBTableTracks"
			request.header = {id:id}
			request.args = []
			socket.write(request)			
		}).text("Dump & Rebuild Uploaded Tracks")

		var playlists = $('<div class="mainMenuButton">').click(function(){
			var request = {}
			request.command = "clearDBPlaylist"
			request.header = {id:id}
			request.args = []
			socket.write(request)			
		}).text("Dump & Rebuild Playlists")

		menuContainer.append(tracks)
		menuContainer.append(playlists)
	}
})