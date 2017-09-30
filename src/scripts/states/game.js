var gameState = {
	dialog: {}
};

gameState.create = function(){
    setupBureau();
    setupUI();

    this.dialog = new Dialog(tutoText); //voir utils/dialogs.js et utils/dialogsTexts.js
    this.dialog.start();
};

var dialogRect = new Phaser.Rectangle(118, 344, 672, 96);
var conseilRect = new Phaser.Rectangle(10, 300, 98, 140);

gameState.render = function(){
    game.debug.inputInfo(10,10);
    //game.debug.geom(dialogRect, 'rgba(255,0,0,.5)');
    game.debug.geom(conseilRect, 'rgba(0,255,0,.5)');
}