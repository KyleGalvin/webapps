define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"playbar")
		var socket = require("socket")
		this.view = $('<div class="playbar">')
		
		this.handleMessage = function(message){
		}
	}
})