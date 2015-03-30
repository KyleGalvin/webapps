var model = {}
var db= require("./dbConnector")
var fs = require("fs")
var pubSub = require("./publishSubscribe")
var server
//maybe we should start managing dispatcher modules and dependencies instead of having everything located in this one file?
var id3 = require('id3js')
//var bookshelf = new db() //.getBookshelf()
//var modelHandler = require('./modelHandler')
//var path = require('path')
//var git = require('../node_modules/nodegit/')
//var fs = require('fs')

module.exports = {
	init:function(srv){
		//the publish widget is priveledged
		//as it requires the ability to send data 
		//to arbitrary clients
		console.log('starting connections',srv)
		server = srv
		
	},
	call: function(args){
		console.log("calling command:",args.command)
		if(_cmds[args.command]){
			var result = _cmds[args.command](args)
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

function stringToModelID(string){
	return string.replace(' ','_')
}

_cmds = {
	ping: function(args){
		return {ping:args}
	},
	get: function(args){
		console.log("get args:",args)
		var allTracks = db.getTracks() //.then() for synching?
		console.log("dbTracks:",allTracks)
		return allTracks
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
		// 				t.text('file')
		// 				t.text('artist')
		// 				t.text('album')
		// 				t.integer('track')
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
