
define(function(require){
	return function(){
		var connections = [] 
		var subscriptions={}
		var publish = function(message,channel){
			publishHelper(message,channel,subscriptions);
		}
		function publishHelper(message,channel,subscriptionSubTree){
			if(channel.length>1){
				var nextNodeName = channel.shift()
				publishHelper(message,channel,subscriptionSubTree[nextNodeName])
			}

			var recipients = subscriptionSubTree[channel[0]].subscribers
			recipients.forEach(function(recipient){
				connections[recipient].send(message)
			})
			
		}
		var subscribe = function(recipient,channel){
			//recipient bound to socket address
			//calls socket.send to publish network over the network
		}
		var unsubscribe = function(recipient,channel){
		}
	}
})
