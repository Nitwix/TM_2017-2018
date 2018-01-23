var gameEls = {};
gameEls.setup = {};

gameEls.setup.background = function(){
    gameEls.background = game.add.image(0,0,"bureau");
    gameEls.background.width = game.width;
    gameEls.background.height = game.height;

}

gameEls.setup.earthMap = function(){
    gameEls.earthMap = game.add.image(0,0,"earthMap");
    gameEls.earthMap.scale.setTo(2**.5);
    centerObj(gameEls.earthMap); //voir utils/pos.js
}

gameEls.setup.fsBtn = function(){
    gameEls.fsBtn = new MenuButton(() => {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen();
        }
    }, this, "fs", "TOPMOST");
}

gameEls.setup.UI = function(){
    gameEls.setup.fsBtn();

    gameEls.researchBtn = new MenuButton(() => {
        let newspaper = new Newspaper("smallSections", globals.data.factoryResearch, this);
        newspaper.start();
    }, this, "research", gameEls.fsBtn);

    gameEls.statsBtn = new MenuButton(() => {
        updateStatsData();
        let statsNP = new Newspaper("smallSections", globals.data.stats);
        statsNP.start();
    }, this, "stats", gameEls.researchBtn);


    // gameEls.ecoActionsBtn = new MenuButton(() => {
    //     globals.ecoActionsMgr.startNP();
    //     globals.ecoActionsMgr.toggleRedDot();
    // }, this, "ecoActions", gameEls.statsBtn);


    gameEls.lastBtn = gameEls.statsBtn; //pour pouvoir mettre le worldButton en-dessous

    //autres éléments permanents de l'UI...
}

//ferme les éléments qui sont décrits ci-dessous
gameEls.stopTmpEls = function(){
    //ferme le newspaper si on click pour revenir à la worldview
    if(gameEls.dialog != undefined){
        gameEls.dialog.stop();
    }
    if(gameEls.newspaper != undefined){
        gameEls.newspaper.stop();
    }
    if(gameEls.smallDialog != undefined){
        gameEls.smallDialog.stop();
    }
}

gameEls.fadeCam = function (duration, alpha, onCompleteCB){
    game.camera.fade(0x000000, duration, true, alpha);
    // console.log(game.camera);
    if (onCompleteCB) {
        game.camera.onFadeComplete.addOnce(onCompleteCB, this);
        // debugger;
    }
}

/** @type {(Dialog|undefined)} */
gameEls.dialog = undefined;

/** @type {(Newspaper|undefined)} */
gameEls.newspaper = undefined;

/** @type {(SmallDialog|undefined)} */
gameEls.smallDialog = undefined;
