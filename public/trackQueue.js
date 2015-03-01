define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"trackQueue")
		var socket = require("socket")

		var queueHeaderWidget = require("queueHeader")
		var queueHeader = new queueHeaderWidget()

		var uploadTrackQueueWidget = require("uploadTrackQueue")
		var uploadTrackQueue = new uploadTrackQueueWidget()

		var fileUploadWidget = require("fileUpload")
		var fileUpload = new fileUploadWidget()
		var playlistQueueWidget = require("playlistQueue")

		this.handleMessage = function(message){
		}

		this.view = $('<div class="mainContainer">')

		this.view.append(queueHeader.view)
		this.view.append(uploadTrackQueue.view)

		var footer = $('<div class="footer">')
		var leftFoot = $('<div class="twoColumnLeft">')
		var rightFoot = $('<div class="twoColumnRight">')

		leftFoot.append(fileUpload.view)


		footer.append(leftFoot)
		footer.append(rightFoot)

		this.view.append(footer)
	}
})