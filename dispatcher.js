var model = {}
var db= require("./dbConnector")
var fs = require("fs")
var pubSub = require("./publishSubscribe")

//maybe we should start managing dispatcher modules and dependencies instead of having everything located in this one file?
var id3 = require('id3js')
//var bookshelf = new db() //.getBookshelf()
//var modelHandler = require('./modelHandler')
//var path = require('path')
//var git = require('../node_modules/nodegit/')
//var fs = require('fs')

module.exports = {
	call: function(cmd,sessionID,args,header){
		console.log("calling command:",cmd)
		if(_cmds[cmd]){
			var result = _cmds[cmd](args)
			if(result){
				console.log("returning result to sender",result)
				return result
			}
		}else{
			console.log("command not found!",cmd)
			return {"test":"command not found returned"}
		}
	}

}

function stringToModelID(string){
	return string.replace(' ','_')
}

_cmds = {
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
	subscribe:function(args){
		console.log('in dispatcher subscribe with args ',args)
		console.log('pubsub',pubSub)
		var argsTop = args.shift()
		pubSub.subscribe(argsTop,args)
	},
	addTrack: function(args){

		var readID3 = function(){
			id3({ file: "./tmp/"+args[0], type: id3.OPEN_LOCAL }, function(err, tags) {
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
			    	}

			    	console.log("id: ",id)
			    	console.log("track? ",track)
			    	fs.rename("./tmp/"+args[0], serverFilename,completeDBRecord)
			    })
		// 				t.text('file')
		// 				t.text('artist')
		// 				t.text('album')
		// 				t.integer('track')
			})

		}
		console.log("args: ",args)
		var file = fs.createWriteStream("./tmp/"+args[0])
		file.on("error",function(err){console.log("error:",err)})
		file.write(args[1])
		file.on("close",readID3)
		file.end()
		console.log("file closed")

		console.log("done addTrack()")
	}
}
