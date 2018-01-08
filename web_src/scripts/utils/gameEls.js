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

gameEls.setup.UI = function(){
    gameEls.fsBtn = game.add.button(0,0,"buttons",() => {
        if(game.scale.isFullScreen){
            game.scale.stopFullScreen();
        }else{
            game.scale.startFullScreen();
        }
    },this,3,4,5,3);
    gameEls.fsBtn.scale.setTo(globals.UI.smallButtonScale);
    cornerObj(gameEls.fsBtn, globals.UI.buttonOffset, "ne");

    gameEls.researchBtn = game.add.button(0,0,"buttons", () => {
        let newspaper = new Newspaper("smallSections", globals.data.factoryResearch, this);
        newspaper.start();
    }, this, 9,10,11,9);
    gameEls.researchBtn.scale.setTo(globals.UI.smallButtonScale);
    gameEls.researchBtn.alignTo(gameEls.fsBtn, Phaser.BOTTOM_CENTER, 0, globals.UI.buttonOffset);

    gameEls.statsBtn = game.add.button(0,0,"buttons", () => {
        console.log("Stats btn pressed");
        let data = {
            title: "Statistiques",
            spritesheet: "statsIcons", //n'existe pas encore
            els: [
                {
                spriteIndex: 0, 
                title: "Mondios", 
                descr: "Ceci représente combien d'argent vous possédez.",
                posTxt: "lol",
                negTxt: "pas lol"
            }
            ]
        };
        let statsNP = new Newspaper("smallSections", data);
        statsNP.start();
    }, this, 12, 13, 14, 12);
    gameEls.statsBtn.scale.setTo(globals.UI.smallButtonScale);
    gameEls.statsBtn.alignTo(gameEls.researchBtn, Phaser.BOTTOM_CENTER, 0, globals.UI.buttonOffset);

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

/** @type {(Dialog|undefined)} */
gameEls.dialog = undefined;

/** @type {(Newspaper|undefined)} */
gameEls.newspaper = undefined;

/** @type {(SmallDialog|undefined)} */
gameEls.smallDialog = undefined;
