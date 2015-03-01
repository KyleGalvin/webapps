define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this)
		var socket = require("socket")
		var dropzone = require('dropzone')
		this.view = $("<div>")
		this.handleMessage = function(message){
			console.log("file handler message:",message)
		}

		var handleFileChange = function(event,files){
			console.log('file change detected',event,files)
			var reader = new FileReader();
			var fileArrayBuffer = reader.readAsArrayBuffer(files[0])
			//reader.readAsText(files[0], "UTF-8");
			reader.onload = function (evt) {
				console.log("file reader loaded: ",evt)
				console.log('data length:',evt.target.result.length)
				var request = {}
				request.command = "addTrack"
				request.header = {id:id}
				request.args = [files[0].name,evt.target.result]
				socket.write(request)
			}
			reader.onerror = function (evt) {
				console.log("file reader error: ",evt)
			}

		}

		var dropzoneDOM = $('<input class="invisible" type="file" multiple>')//this allows the user to select a file
		var footer = $('<div class="fileUpload">').text("Click or Drag to Upload")//clicking this div triggers the file input click

		footer.click(function(){
			dropzoneDOM.click()
			return false
		})
		this.view.append(dropzoneDOM)
		this.view.append(footer)
		
		dropzoneDOM.change(function(event){handleFileChange(event,this.files)})
		
	}
})