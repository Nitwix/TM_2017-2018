var gameEls = {};
gameEls.setup = {};

gameEls.setup.bureau = function(){
    gameEls.bureau = game.add.image(0,0,"bureau");
	gameEls.bureau.width = game.width;
	gameEls.bureau.height = game.height;

	gameEls.earthMap = game.add.image(0,0,"earthMap");
	gameEls.earthMap.scale.setTo(2**.5);
	centerObj(gameEls.earthMap); //voir utils/img_pos.js
}

gameEls.setup.UI = function(){
    gameEls.fsButt = game.add.button(0,0,"buttons",function(){
		if(game.scale.isFullScreen){
			game.scale.stopFullScreen();
		}else{
			game.scale.startFullScreen();
		}
	},this,3,4,5,3);
	gameEls.fsButt.scale.setTo(2);
	cornerObj(gameEls.fsButt, globals.UI.buttonOffset, "ne");
}

