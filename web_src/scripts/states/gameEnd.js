let gameEndState = {
    create: () => {

        gameEndState.txt = ["Félicitations, vous êtes parvenu à un point de non retour dans le réchauffement climatique.",
            "Votre planète continuera à se réchauffer dans un cycle de rétroaction positive (ne pensez pas que c'est une bonne chose)."];

        let count = 0;
        gameEndState.showNextTxt(count);
    },

    //TODO: déplacer cette fonction dans une classe ou fonction séparée
    showNextTxt: (count) => {
        const tweenDur = 2000;
        
        if(count < gameEndState.txt.length){
            let txtObj = game.add.bitmapText(0, 0, "pixel_font", gameEndState.txt[count], 28);
            txtObj.maxWidth = 650;

            txtObj.alignIn(game.world, Phaser.TOP_LEFT, -100, -count * 80 - 100);
            // debugger;
            let txtTween = game.add.tween(txtObj);
            txtObj.alpha = 0;
            txtTween.to({ alpha: 1 }, tweenDur);
            txtTween.start();
            txtTween.onComplete.add(() => {
                gameEndState.showNextTxt(count + 1);
            }, this);
        }else{
            let btnGroup = game.add.group();

            let btn = game.make.button(0,0,"wide_buttons", () => {
                game.state.start("mainMenu");
            }, this, 0,1,2,0);
            btn.scale.setTo(3);
            btn.alignIn(game.world, Phaser.CENTER, 0, 100);
            btnGroup.add(btn);

            let btnTxt = game.make.bitmapText(0,0,"pixel_font", "Menu principal", 36);
            btnTxt.alignIn(btn, Phaser.CENTER);
            btnGroup.add(btnTxt);

            btnGroup.alpha = 0;
            let btnTween = game.add.tween(btnGroup);
            btnTween.to({alpha:1}, tweenDur);
            btnTween.start();
        }
    }
}