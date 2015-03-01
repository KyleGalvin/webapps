define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"playlistQueue")
		var socket = require("socket")
		this.view = $('<div class="playlistQueue">')

		var queueHeaderWidget = require("queueHeader")
		var queueHeader = new queueHeaderWidget()

		var playlistWidget = require("playlist")
		var playlistQueue = new playlistWidget()

		var fileUploadWidget = require("fileUpload")
		var fileUpload = new fileUploadWidget()
		var playlistWidget = require("playlistQueue")

		this.handleMessage = function(message){
		}

		this.view.append(queueHeader.view)
		this.view.append(playlistQueue.view)

		var footer = $('<div class="footer">')
		var playbarWidget = require("playbar")
		var playbar = new playbarWidget()
		footer.append(playbar.view)


		this.view.append(footer)
	}
})