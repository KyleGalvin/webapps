define(function(require){
	return function(){
		var id = require("widgetRegistry").register(this,"mapEdit")
		var socket = require("socket")
		this.view = $('<div class="mapEdit">')
		this.view.append($('<div class="mousePosition">'))

		this.handleMessage = function(message){

		}
		var canvasWrapper = $('<div class="mapEdit">')
		var canvas = $('<canvas class="canvas">')
		canvasWrapper.append(canvas)
		var canvasHeight = canvasWrapper[0].height
		var canvasWidth = canvasWrapper[0].width
		this.view.append(canvasWrapper)
		console.log("canvas:",canvas,canvasHeight,canvasWidth)
		var ctx = canvas[0].getContext('2d')
		ctx.fillStyle = "#FF0000"
		ctx.arc(100,75,50,0,2*Math.PI)
		ctx.stroke()
		// $("body").resize(function(){
		// 	var canvasHeight = canvasWrapper[0].height
		// 	var canvasWidth = canvasWrapper[0].width
		// 	ctx.arc(canvasWidth/2,canvasHeight/2,50,0,2*Math.PI)
		// })
		drawing = new Image();
		drawing.src = "./assets/PNG_transparency_demonstration_1.png"; // can also be a remote URL e.g. http://


		canvas[0].addEventListener('mousemove', function(evt) {
			var mousePos = getMousePos($(this), evt);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' Cell: (' + Math.floor(mousePos.x / 50) + ',' + Math.floor(mousePos.y / 50)+')';
			$(".mousePosition").text(message);
		}, false);

		// $("canvas").addEventListener('mousemove', function(evt) {
		// 	var mousePos = getMousePos($(this), evt);
		// 	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		// 	console.log(message);
		// }, false);

		var draw = function() {
			var ctx = $(".canvas")[0].getContext('2d')
			ctx.canvas.width  = window.innerWidth
			ctx.canvas.height = window.innerHeight
			console.log("drawing",window.innerWidth/2,window.innerHeight/2)
			ctx.arc(window.innerWidth/2, window.innerHeight/2,50,0,2*Math.PI)
			ctx.stroke()

			ctx.drawImage(drawing,0,0);

			ctx.beginPath();
			ctx.moveTo(100, 20);
			ctx.lineTo(200, 160);			// line 1
			ctx.quadraticCurveTo(230, 200, 250, 120);			// quadratic curve
			ctx.bezierCurveTo(290, -40, 300, 200, 400, 150);			// bezier curve
			ctx.lineTo(500, 90);			// line 2
			ctx.lineWidth = 5;
			ctx.strokeStyle = 'blue';
			ctx.stroke();

			for(var i=0;i<10; i++){
				ctx.beginPath()
				ctx.moveTo(i*50,0)
				ctx.lineTo(i*50,500)
				ctx.stroke()
				ctx.beginPath()
				ctx.moveTo(0,i*50)
				ctx.lineTo(500,i*50)
				ctx.stroke()
			}
		}

		function getMousePos(canvas,evt) {
			var rect = canvas[0].getBoundingClientRect()
			return{
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			}
		}

		var animFrame = window.requestAnimationFrame ||
		            window.webkitRequestAnimationFrame ||
		            window.mozRequestAnimationFrame    ||
		            window.oRequestAnimationFrame      ||
		            window.msRequestAnimationFrame     ||
		            null ;
		    animFrame( draw );
		var recursiveAnim = function() {
		    draw()

		    animFrame( recursiveAnim )
		}




    // start the mainloop
    animFrame( recursiveAnim );

	}
})

