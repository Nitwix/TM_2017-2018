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
    gameEls.fsButt = game.add.button(0,0,"buttons",function(){
        if(game.scale.isFullScreen){
            game.scale.stopFullScreen();
        }else{
            game.scale.startFullScreen();
        }
    },this,3,4,5,3);
    gameEls.fsButt.scale.setTo(globals.UI.smallButtonScale);
    cornerObj(gameEls.fsButt, globals.UI.buttonOffset, "ne");

    //autres éléments permanents de l'UI...
}

/** @type {(Dialog|undefined)} */
gameEls.dialog = undefined;

/** @type {(Newspaper|undefined)} */
gameEls.newspaper = undefined;

/** @type {(SmallDialog|undefined)} */
gameEls.smallDialog = undefined;
