var gameState = {};

gameState.create = function(){
    gameEls.setup.bureau(); //voir utils/gameEls.js
    gameEls.setup.UI();

    this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et others/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
};

gameState.update = function(){
	globReg.update(); 
    
    /* Permet d'obtenir le x et y quand on clique
    if(game.input.activePointer.isDown && game.time.now % 100 == 0){
        console.log(game.input.x, game.input.y);
    }*/
}



gameState.render = function(){
    //game.debug.inputInfo(10,10);
}