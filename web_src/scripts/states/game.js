let gameState = {};

gameState.create = function(){
    //en cas de nouvelle partie, réinitialisons.
    globals.reset();


    gameEls.setup.background(); //voir utils/gameEls.js
    gameEls.setup.earthMap();
    gameEls.setup.UI();

    //this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et others/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
    /*this.conseilRect = new Phaser.Rectangle(0, 0, 96, 128);
    cornerObj(this.conseilRect, 10, "sw");*/

    globals.moneyMgr = new MoneyMgr(globals.initMoney);

    globals.productionMgr = new ProductionMgr();

    globals.timeMgr = new TimeMgr(32e3, [
        () => {
            globals.productionMgr.update();

            // ATTENTION si on change le titre du newspaper stats
            if(gameEls.newspaper && gameEls.newspaper.data.title == "Statistiques"){
                globals.data.stats = updateStatsData();
                gameEls.newspaper.softUpdate(globals.data.stats);
            }
        }
    ]);
    globals.timeMgr.startUpdate();

    globals.productionMgr.energyProduction = 0;

    globals.researchMgr = new ResearchMgr();

    // globals.ecoActionsMgr = new EcoActionsMgr();

    // globals.initData();

};


gameState.update = function(){
    //on ne peut que cliquer sur les régions lorsqu'il n'y a pas de newspaper
    if(gameEls.newspaper == undefined){
        globReg.update();
    }

    //Permet d'obtenir le x et y quand on clique
    if(game.input.activePointer.isDown){
        // console.log(game.input.x, game.input.y);
    }
}



gameState.render = function(){
    //game.debug.inputInfo(10,10);
    //game.debug.geom(this.conseilRect);

}
