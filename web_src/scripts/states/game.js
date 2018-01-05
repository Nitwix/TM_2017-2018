let gameState = {};

gameState.create = function(){
    gameEls.setup.background(); //voir utils/gameEls.js
    gameEls.setup.earthMap();
    gameEls.setup.UI();

    //this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et others/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
    /*this.conseilRect = new Phaser.Rectangle(0, 0, 96, 128);
    cornerObj(this.conseilRect, 10, "sw");*/

    globals.moneyMgr = new MoneyMgr(25e6);

    globals.productionMgr = new ProductionMgr();

    globals.timeMgr = new TimeMgr(32e3, [
        () => {
            globals.productionMgr.update();
        }
    ]);
    globals.timeMgr.startUpdate();

    globals.productionMgr.energyProduction = 0;

    globals.researchMgr = new ResearchMgr();

    // let newspaper = new Newspaper("smallSections", globals.data.factories);
    // newspaper.start();

    // let test1 = game.add.sprite(200,200, 'smokeAnim');
    // test1.scale.setTo(2, 4);
    // let anim1 = test1.animations.add('smoke', null, 8, true);
    // anim1.play();
    //
    // let test2 = game.add.sprite(400,200, 'explosionAnim');
    // test2.scale.setTo(4);
    // let anim2 = test2.animations.add('explode', null, 8, true);
    // anim2.play();


};
gameState.update = function(){
    //on ne peut que cliquer sur les régions lorsqu'il n'y a pas de newspaper
    if(gameEls.newspaper == undefined){
        globReg.update();
    }

    // globals.moneyMgr.totVal += 10000;
    // console.log(globals.moneyMgr.totVal);

    //Permet d'obtenir le x et y quand on clique
    if(game.input.activePointer.isDown){
        // console.log(game.input.x, game.input.y);
    }
}



gameState.render = function(){
    //game.debug.inputInfo(10,10);
    //game.debug.geom(this.conseilRect);

}
