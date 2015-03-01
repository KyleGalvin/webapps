define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,'playlist')
		var socket = require("socket")
		var mustache = require("mustache.min")

		this.view = $('<div class="playlist">')

		this.handleMessage = function(message){
			
			console.log("handling message:",message)
			var data = {items:message}
			//var templateData = {message}
			var trackScrollTemplate = '\
				<div class="trackScrollContainer">\
					{{#items}}\
					<div class="trackScrollItem">\
						<div class="twoColumnLeft">\
							<div class="relative">\
								<div class="trackDetailText">{{artist}}</div>\
								<div class="trackDetailText">{{album}}</div>\
								<div class="trackDetailText">{{title}}</div>\
							</div>\
						</div><div class="twoColumnRight">\
							<audio class="trackPlayer" controls>\
								<source src="{{file}}" type="audio/mpeg">\
								Your browser does not support the audio element.\
							</audio>\
						</div>\
					</div>\
					{{/items}}\
				</div>\
			'
			var html = mustache.to_html(trackScrollTemplate, data)
			$('.uploadQueue').html(html)
		}

		var request = {}
		request.command = "get"
		request.header = {id:id}
		request.args = ["tracks"]
		socket.write(request)
	}
})