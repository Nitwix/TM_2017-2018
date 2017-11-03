var gameState = {};

gameState.create = function(){
    gameEls.setup.bureau(); //voir utils/gameEls.js
    gameEls.setup.UI();

    this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et others/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
    /*this.conseilRect = new Phaser.Rectangle(0, 0, 96, 128);
    cornerObj(this.conseilRect, 10, "sw");*/
    // let testDial = new SmallDialog(50,50,"Title", "Description that is not too long", "Expensive", () => {});
    // testDial.open();

    globals.moneyMgr = new MoneyMgr(10500);
};

gameState.update = function(){
	globReg.update();
    // globals.moneyMgr.totVal += 10000;
    // console.log(globals.moneyMgr.totVal);

    /* Permet d'obtenir le x et y quand on clique
    if(game.input.activePointer.isDown && game.time.now % 100 == 0){
        console.log(game.input.x, game.input.y);
    }*/
}



gameState.render = function(){
    //game.debug.inputInfo(10,10);
    //game.debug.geom(this.conseilRect);

}
