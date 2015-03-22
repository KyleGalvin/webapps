//bluebird for promises and the .then() method
//promises are frequently used by knex and bookshelf
//which is the initial reason this was imported
var promise = require('bluebird')

var knex = require('knex')({
  client: 'pg',
  //client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'test',
    charset  : 'utf8'
  }
})

var bookshelf = require('bookshelf')(knex)

var Track = bookshelf.Model.extend({
  tableName: 'tracks'
})

module.exports = {

	clearDBPlaylist: function(){
		return bookshelf.knex.schema.hasTable('playlist').then(function(exists) {
		  if (exists) {
		    return knex.schema.dropTable('playlist')
		  }
		}).then(function(){
			console.log('creating playlist')
			return bookshelf.knex.schema.createTable('playlist', function(t){
				console.log("literally creating playlist table")
				t.increments('id').primary()
				t.integer('track_id')
				t.integer('user_id')
				t.integer('sort_order')
			})
		})
	},
	clearDBTableTracks:function(){
		return bookshelf.knex.schema.hasTable('tracks').then(function(exists) {
		  if (exists) {
		    return knex.schema.dropTable('tracks')
		  }
		}).then(function(){
			console.log('creating tracks')
			return bookshelf.knex.schema.createTable('tracks', function(t){
				console.log("literally creating tracks table")
				t.increments('id').primary()
				t.text('file')
				t.text('artist')
				t.text('album')
				t.text('name')
				t.integer('year')
				t.integer('track')
			})
		})

	},
	getTracks: function(){
		return new Track().query('orderBy', 'id', 'desc').fetchAll()
			.then(function(Tracks){
				return Tracks.toJSON()
			})
	},
	newTrack: function(){
		return new Track()
	}
//	getBookshelf: function(){



		// var User = bookshelf.Model.extend({
		//   tableName: 'users'
		// })	

//bookshelf.knex.select().from('tracks')


		// //MAKE SURE OUR DB IS SET UP
		// var createTracks = function(bookshelf){

		// 	bookshelf.knex.schema.hasTable('tracks')
		// 	.then(function(exists) {
		// 		if(!exists){//if our database table 'tracks' does not exist, create it
		// 			return bookshelf.knex.schema.createTable('tracks', function(t){
		// 				t.increments('id').primary()
		// 				t.text('file')
		// 				t.text('artist')
		// 				t.text('album')
		// 				t.integer('track')
		// 			})
		// 		}
		// 	})
		// 	.then(function(){

		// 		var allTracks = new Track().fetchAll()
		// 			.then(function(tracks){//if our 'tracks' table is empty, insert some test data
		// 				if(tracks.toJSON().length == 0){
		// 					var track1 = new Track({
		// 							file: "file1.mp3",
		// 							artist:"artist1",
		// 							album:"album1",
		// 							track:1
		// 						}).save()
		// 					var track2 = new Track({
		// 							file: "file1.mp3",
		// 							artist:"artist2",
		// 							album:"album2",
		// 							track:2
		// 						}).save()
		// 					var track3 = new Track({
		// 							file: "file3.mp3",
		// 							artist:"artist3",
		// 							album:"album3",
		// 							track:3
		// 						}).save()
		// 				}
		// 			})

		// 		})

		// }
		// return bookshelf;
//	}
}
	 
