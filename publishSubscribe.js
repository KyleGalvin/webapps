var subscriptions = {}
var publishHelper = function(message,subTree,channel){
	var channel = subTree.channels[channel[0]]
	if(channel.subscribers){
		for(var subscriber in channel.subscribers){
			subscriber(message)
		}
	}
	if(channel.length > 1 ){
		console.log('publishing message ',message)
		publishHelper(message,channel,channel.shift())
	}
}

module.exports = {
	publish : function(message,channel){
		publishHelper(message,subscriptions,channel)
	},
	subscribe : function(agent,channel,callback){
		console.log('subscribe called with args ',agent,"and",channel)
		//traverse to the bottom of our subscription tree
		//if traversed node is not found, create it lazily along the way
		var subTree = subscriptions
		for(var i=0; i<channel.length;i++){
			if(!subTree.channels){
				//create it
				subTree.channels = {}
			}
			if(!subTree.channels[channel[i]]){
				console.log("creating channel",channel[i])
				subTree.channels[channel[i]] = {}
			}
			subTree=subTree.channels[channel[i]]
		} 
		if(!subTree.subscribers){
			subTree.subscribers = {}
		}
		console.log("key:",agent.id +"_"+agent.widgetID)
		subTree.subscribers[agent.id+"_"+agent.widgetID]=callback
		console.log("subscriptions:",subscriptions)
	},
	/*returns true on successful deletion of record, returns -1 if record not found */
	unsubscribe : function(agent,channel){
		//traverse to the bottom of our subscription tree
		var subTree = subscriptions
		for(var i; i<channel.length;i++){
			if(!subTree.channels){
				//create it
				return -1
			}
			if(!subTree.channels[channel[i]]){
				return -1
			}
			subTree=subTree.channels[channel[i]]
		}
		var subscribers = subTree.subscribers
		delete subscribers[agent]
		return true 
	}
}
