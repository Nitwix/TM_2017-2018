const {remote} = require("electron");
var gameEls = {};
gameEls.setup = {};

let mainWindow = remote.getCurrentWindow();

gameEls.setup.bureau = function(){
    gameEls.bureau = game.add.image(0,0,"bureau");
	gameEls.bureau.width = game.width;
	gameEls.bureau.height = game.height;

	gameEls.earthMap = game.add.image(0,0,"earthMap");
	gameEls.earthMap.scale.setTo(2**.5);
	centerObj(gameEls.earthMap); //voir utils/pos.js
}

gameEls.setup.UI = function(){
  gameEls.fsButt = game.add.button(0,0,"buttons",() => {
        console.log(mainWindow.isFullScreen());
		if(mainWindow.isFullScreen()){
			mainWindow.setFullScreen(false);
            game.state.stopFullScreen();
		}else{
			mainWindow.setFullScreen(true);
            game.scale.startFullScreen();
		}
	},this,3,4,5,3);
	gameEls.fsButt.scale.setTo(globals.UI.smallButtonScale);
	cornerObj(gameEls.fsButt, globals.UI.buttonOffset, "ne");

    //autres éléments permanents de l'UI...
}
