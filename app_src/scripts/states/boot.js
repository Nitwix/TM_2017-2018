var bootState = {};

bootState.create = function(){
	//mode de plein écran (utilisé dans mainMenu.js et plus tard)
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


	game.state.start("preload");
}
