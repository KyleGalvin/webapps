define(function(require){
	return function(){

		var id = require("widgetRegistry").register(this,"main")
		var socket = require("socket")
		this.view = $('<div class="main">')
		
		var logger = require('log')
		new logger()

		var mainPanel = $('<div class="mainPanel">')
		var menuTogglePanel = $('<div class="menuTogglePanel">').append($('<i class="menuToggleIcon icon-th">'))
		var menuInnerPanel = $('<div class="menuInnerPanel">')
		var menuPanel = $('<div class="menuPanel">')

		var menuWidget = require('menu')
		var menu = new menuWidget()
		menuInnerPanel.append(menu.view)

		var mainWidget = require('slider')
		var main = new mainWidget()
		mainPanel.append(main.view)

		menuPanel.append(menuTogglePanel)
		menuPanel.append(menuInnerPanel)
		this.view.append(mainPanel)
		this.view.append(menuPanel)

		this.handleMessage = function(message){
			if(message.command == "toggleMenu"){
				toggleMenu()
			}
		}

		var menuOpen = 'false'

		menuTogglePanel.click(function(){
			toggleMenu()
		})

		var toggleMenu = function(){
			if(menuOpen){
				closeMenu()
			}else{
				openMenu()
			}
			menuOpen = !menuOpen			
		}

		var closeMenu = function(){
			menuPanel.animate({
				right:"-=80%"
			},500,function(){})			
		}

		var openMenu = function(){
			menuPanel.animate({
				right:"+=80%"
			},500,function(){})			
		}
	}
})
