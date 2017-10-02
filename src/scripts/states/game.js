var gameState = {
	dialog: {}
};

gameState.create = function(){
    gameEls.setup.bureau();
    gameEls.setup.UI();

    //console.log(gameEls.bureau.width);

    //this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et utils/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
};

gameState.update = function(){
	globReg.update(); 
}



gameState.render = function(){
    game.debug.inputInfo(10,10);
}