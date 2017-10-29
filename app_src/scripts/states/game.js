var gameState = {};

const fs = require("fs");
const path = require("path");

gameState.create = function(){
    gameEls.setup.bureau(); //voir utils/gameEls.js
    gameEls.setup.UI();

    this.dialog = new Dialog(tutoTexts); //voir utils/dialogs.js et others/dialogsTexts.js
    //this.dialog.start();

    globReg.init(); //voir utils/globReg.js
    /*this.conseilRect = new Phaser.Rectangle(0, 0, 96, 128);
    cornerObj(this.conseilRect, 10, "sw");*/

    // fs.writeFile(path.join(__dirname, "saved_content/points.txt"), "", function (err) {
    //     if (err) throw err;
    //     console.log('Cleared points.txt');
    // });
};

gameState.update = function(){
    globReg.update();
    //console.log(globals.currentRegion);
    // Permet d'obtenir le x et y quand on clique
    // if(game.input.activePointer.isDown){ //  && game.time.now % 100 == 0
    //     let x = game.input.x;
    //     let y = game.input.y;
    //     console.log(x,y);
    //     // console.log(__dirname);
    //     fs.appendFile(path.join(__dirname, "saved_content/points.txt"), `x: ${x}; y: ${y} \n`, function (err) {
    //         if (err) throw err;
    //         console.log('Updated!');
    //     });
    // }
}


gameState.render = function(){
    //game.debug.inputInfo(10,10);
    //game.debug.geom(this.conseilRect);

}
