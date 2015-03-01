var Event = function(name){
	var thisEvent = this
	this.name = name
	this.callbacks = []
	this.registerCallback = function(callback){
		thisEvent.callbacks.push(callback)
	}
}

var events = {}

module.exports = {
	trigger: function(eventName, eventArgs){
		if(events[eventName]){
			events[eventName].callbacks.forEach(function(callback){
				callback(eventArgs)
			})				
		}
	},
	on: function(eventName, callback){
		if( ! events[eventName] ){
			var event = new Event(eventName)
			events[eventName] = event
		}
		events[eventName].registerCallback(callback)
	}

}