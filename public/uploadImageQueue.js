define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,'uploadImageQueue')
		var socket = require("socket")
		var mustache = require("mustache.min")

		this.view = $('<div class="uploadQueue">')

		this.handleMessage = function(message){
			
			console.log("handling message:",message)
			var data = {items:message}
			//var templateData = {message}
			var trackScrollTemplate = '\
				<div class="trackScrollContainer">\
					{{#items}}\
					<div class="imageScrollItem">\
							<img src="./assets/{{thumbnail}}.{{type}}"></img>\
							<div class="relative" style="display:none;">\
								<div class="trackDetailText">{{name}}</div>\
								<div class="trackDetailText">{{type}}</div>\
								<div class="trackDetailText">{{width}}</div>\
								<div class="trackDetailText">{{height}}</div>\
							</div>\
					</div>\
					{{/items}}\
				</div>\
			'
			var html = mustache.to_html(trackScrollTemplate, data)
			$('.uploadQueue').html(html)
		}

		var request = {}
		/*request.command = "get"
		request.header = {widgetID:id}
		request.args = ["tracks"]
		socket.write(request)*/

		//subscribe to recieve updates when images are changed
		request.command = "subscribe"
		request.header = {widgetID:id}
		request.args = ["sql","images"]
		socket.write(request)

		//get all images and place them in template
		request.command = "getImages"
		request.header = {widgetID:id}
		socket.write(request)
	}
})
