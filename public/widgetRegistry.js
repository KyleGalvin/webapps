define(function(require){
	var instance = null
    function MySingleton(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()")
        }
        this.initialize()
    }
    MySingleton.prototype = {
        initialize: function(){
		this.counter = 0
		this.widgetLookupTable = {}
		this.widgetNameTable = {}
		this.register = function(widget,type){
			this.counter = this.counter + 1
			console.log("widget ",type," given UID ",this.counter)
			this.widgetLookupTable[this.counter] = widget
			console.log("registering widget",widget)
			if(! this.widgetNameTable[type]){
				this.widgetNameTable[type] = []
			}
			this.widgetNameTable[type].push(widget)
			return this.counter
		}	
		this.lookupID = function(widgetID){
			console.log("lookup number header:",widgetID, "in table",this.widgetLookupTable)
			return this.widgetLookupTable[widgetID]
		}
		this.lookupName = function(widgetName){
			console.log("lookup string header:",widgetName, "in table",this.widgetNameTable)
			return this.widgetNameTable[widgetName]                    
		}
        }
    }
    MySingleton.getInstance = function(){
        if(instance === null){
            instance = new MySingleton()
        }
        return instance
    }
    return MySingleton.getInstance()
})
