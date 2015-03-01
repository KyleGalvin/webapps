define(function(require){
	return function(){
		this.events = {}

		var _this = this

		function Event(name){
			var thisEvent = this
			this.name = name
			this.callbacks = []
			this.registerCallback = function(callback){
				thisEvent.callbacks.push(callback)
			}
		}

		this.trigger = function(eventName, eventArgs){
			if(_this.events[eventName]){
				_this.events[eventName].callbacks.forEach(function(callback){
					callback(eventArgs)
				})				
			}
		}

		this.on = function(eventName, callback){
			if( ! _this.events[eventName] ){
				var event = new Event(eventName)
				_this.events[eventName] = event
			}
			_this.events[eventName].registerCallback(callback)
		}

		return this    
	}
})