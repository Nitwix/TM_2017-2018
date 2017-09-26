var mainMenuState = {
	earthMap: {},
	bureau: {},
};

mainMenuState.preload = function(){

};

mainMenuState.create = function(){
	setupBureau(); //voir utils/setup.js
    setupUI();

	var playButt = game.add.button(0,0,"wide_buttons", function(){
        game.state.start("game");
    }, this, 0,1,2,1);
	playButt.scale.setTo(2);
	centerObj(playButt);
    
    var playText = game.add.bitmapText(0,0,"pixel_font","Jouer", 60);
    playText.alignIn(playButt, Phaser.CENTER, 1, -10);
	
}