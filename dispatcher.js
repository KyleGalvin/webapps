var server
//maybe we should start managing dispatcher modules and dependencies instead of having everything located in this one file?
var db= require("./dbConnector")
var pubSub = require("./publishSubscribe")
//var log = require('./log')
var id3 = require('id3js')
var fs = require("fs")
var easyimg = require('easyimage')

module.exports = {
	init:function(srv){
		//the publish widget is priveledged as it requires
		//the ability to send data to arbitrary clients
		console.log('starting connections',srv)
		server = srv
		
	},
	call: function(args){
		console.log("calling command:",args.command)
		if(cmds[args.command]){
			var result = cmds[args.command](args)
			if(result){
				console.log("returning result to sender",result)
				return result
			}
		}else{
			console.log("command not found!",args.command)
			return {"test":"command not found returned"}
		}
	}

}

cmds = {
	//log: log,
	ping: function(args){
		return {ping:args}
	},
	get: function(context){
		console.log("get args:",context.args)
		var allTracks = db.getTracks() 
		console.log("dbTracks:",allTracks)
		return allTracks
	},
	clearDBTableImages: function(args){
		db.clearDBTableImages()
	},
	clearDBTableTracks: function(args){
		db.clearDBTableTracks()
	},
	clearDBPlaylist: function(args){
		db.clearDBPlaylist()
	},
	subscribe:function(context){
		var callback = server.getConnection(context.header.id)
		pubSub.subscribe(context.header,context.args,callback)

	},
	publish:function(context){
		var message = context.shift()
		pubSub.publish(message,context)
	},
	addImage: function(context){
		var gatherMetaData = function(){
			console.log("gathering meta data...")
			easyimg.info("./tmp/"+context.args[0]).then(function(file){
				console.log("File: ",file)
				console.log("creating image database record")
				var image = db.newImage()
				image.save() // create unique ID associated with this record
				.then(function(){
					var id = image.attributes.id
					var serverFilename = "./public/assets/"+id+"."+file.type
					var clientFilename = "./assets/"+id+"."+file.type

					console.log("creating thumbnail")
					var thumbnail = db.newImage()
					thumbnail.save()
					.then(function(){
						console.log("file metadata has no type:",file)
						var thumbServerFilename="./public/assets/"+thumbnail.attributes.id+"."+file.type
						var thumbClientFilename="./assets/"+thumbnail.attributes.id+"."+file.type
						console.log("thumbnail destination filename>",thumbServerFilename)
						console.log("thumbnail source filename>",serverFilename)
						var completeDBRecord = function(){
							console.log("thumbnail id:",thumbnail.attributes.id)
							image.attributes.type= file.type
							image.attributes.width = file.width
							image.attributes.height = file.height
							image.attributes.file = clientFilename
							image.attributes.name = file.name
							image.attributes.thumbnail = thumbnail.attributes.id

							console.log('completing database fields from image metadata', image)
							image.save().then(function(){
								easyimg.rescrop({
									src:serverFilename, dst:thumbServerFilename,
									width:100, height:100,
									//cropwidth:128, cropheight:128,
									x:0, y:0
								}).then(function(thumbImg){
									console.log("thumbImg data:",thumbImg)
									thumbnail.attributes.type= file.type
									thumbnail.attributes.width = thumbImg.width
									thumbnail.attributes.height = thumbImg.height
									thumbnail.attributes.file = thumbClientFilename
									thumbnail.attributes.name = file.name
									thumbnail.save()
									.then(function(){
										pubSub.publish(image.attributes,['sql','images'])
									})
								})	
							})
						}
						fs.rename("./tmp/"+context.args[0], serverFilename,completeDBRecord)
					})

				})
				console.log("creating thumbnail database record")
			})
		}

		console.log("args: ",context.args)
		var file = fs.createWriteStream("./tmp/"+context.args[0])
		file.on("error",function(err){console.log("error:",err)})
		console.log("writing... ")
		file.write(context.args[1])
		file.on("close",gatherMetaData)
		file.end()

/*
		var gatherMetaData = function(){
			id3({ file: "./tmp/"+context.args[0], type: id3.OPEN_LOCAL }, function(err, tags) {
			    console.log("id3 tags: ",tags)
			    var track = db.newTrack()
			    track.save() // create unique ID associated with this record
			    .then(function(){
			    	var id = track.attributes.id
			    	//the client sees ./public/ as the root directory
			    	var serverFilename = "./public/assets/"+id+".mp3"
			    	var clientFilename = "./assets/"+id+".mp3"
			    	var completeDBRecord = function(){

			    		track.attributes.file= clientFilename
			    		track.attributes.artist = tags.artist
			    		track.attributes.album = tags.album
			    		track.attributes.album.track = tags.v1.track

			    		console.log('completing database fields from id3 tags', track)
			    		track.save()
					pubSub.publish(track.attributes,['sql','tracks'])
			    	}

			    	console.log("id: ",id)
			    	console.log("track? ",track)
			    	fs.rename("./tmp/"+context.args[0], serverFilename,completeDBRecord)
			    })
			})

		}
*/
	},
	addTrack: function(context){

		var readID3 = function(){
			id3({ file: "./tmp/"+context.args[0], type: id3.OPEN_LOCAL }, function(err, tags) {
			    console.log("id3 tags: ",tags)
			    var track = db.newTrack()
			    track.save() // create unique ID associated with this record
			    .then(function(){
			    	var id = track.attributes.id
			    	//the client sees ./public/ as the root directory
			    	var serverFilename = "./public/assets/"+id+".mp3"
			    	var clientFilename = "./assets/"+id+".mp3"
			    	var completeDBRecord = function(){

			    		track.attributes.file= clientFilename
			    		track.attributes.artist = tags.artist
			    		track.attributes.album = tags.album
			    		track.attributes.album.track = tags.v1.track

			    		console.log('completing database fields from id3 tags', track)
			    		track.save()
					pubSub.publish(track.attributes,['sql','tracks'])
			    	}

			    	console.log("id: ",id)
			    	console.log("track? ",track)
			    	fs.rename("./tmp/"+context.args[0], serverFilename,completeDBRecord)
			    })
			})

		}
		console.log("args: ",context.args)
		var file = fs.createWriteStream("./tmp/"+context.args[0])
		file.on("error",function(err){console.log("error:",err)})
		file.write(context.args[1])
		file.on("close",readID3)
		file.end()

		console.log("file closed")
		console.log("done addTrack()")
	}
}
