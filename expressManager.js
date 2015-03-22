
//express for server routing and virtual paths
var express = require("express")
var app = express()
//configure web app, detailing express.js features and defining local file locations
app.use(express.static(__dirname + '/public'))
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'ejs' )
//app.set('bookshelf', bookshelf)
 
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
}
 
app.use(allowCrossDomain)

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
 
// parse application/json
app.use(bodyParser.json())
 
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}))
 
//serve our index.html page when the user requests the root of our webserver
app.get('/',function(req,res){
	console.log('index')
	res.render('index')
})

module.exports ={
	getConfig : function(){
		return app;
	}
}
