let gameState = {};

gameState.create = function(){

    gameEls.setup.background(); //voir utils/gameEls.js
    gameEls.setup.earthMap();
    gameEls.setup.UI();

    globReg.init(); //voir utils/globReg.js

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

    globals.researchMgr = new ResearchMgr();

    if(globals.showTutorial){
        globals.tutorial = new Tutorial();
        globals.tutorial.start();
    }
};

gameState.update = function(){
    //on ne peut que cliquer sur les regions lorsqu'il n'y a pas de newspaper
    if(gameEls.newspaper == undefined){
        globReg.update();
    }
}

