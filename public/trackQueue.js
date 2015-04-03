define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"trackQueue")
		var socket = require("socket")
		this.view = $('<div class="mainContainer">').click(function(){console.log('main container clivk')})

		var queueHeaderWidget = require("queueHeader")
		var queueHeader = new queueHeaderWidget()

		var uploadTrackQueueWidget = require("uploadTrackQueue")
		var uploadTrackQueue = new uploadTrackQueueWidget()

		var fileUploadWidget = require("fileUpload")
		var fileUpload = new fileUploadWidget()
		var playlistQueueWidget = require("playlistQueue")

		this.handleMessage = function(message){
		}


		this.view.append(queueHeader.view)
		this.view.append(uploadTrackQueue.view)

		var footer = $('<div class="footer">').click(function(){console.log("clicked footer")})
		var leftFoot = $('<div class="twoColumnLeft">')
		var rightFoot = $('<div class="twoColumnRight">')

		footer.append(leftFoot)
		footer.append(rightFoot)

		leftFoot.append(fileUpload.view)

		this.view.append(footer)
	}
})
