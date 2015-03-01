define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this)
		var socket = require("socket")
		this.view = $("<div>")
		this.handleMessage = function(message){
		}
	}
})