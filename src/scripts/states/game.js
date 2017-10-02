var gameState = {
	dialog: {}
};

gameState.create = function(){
    setupBureau();
    setupUI();

    this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et utils/dialogsTexts.js
    this.dialog.start();
};

gameState.update = function(){
	
}



gameState.render = function(){
    game.debug.inputInfo(10,10);
}