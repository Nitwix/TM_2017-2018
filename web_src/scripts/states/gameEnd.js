let gameEndState = {
    create: () => {

        gameEndState.txt = ["Félicitations, vous êtes parvenu à un point de non retour dans le réchauffement climatique.",
            "Votre planète continuera à se réchauffer dans un cycle de rétroaction positive (ne pensez pas que c'est une bonne chose)."];

        let count = 0;
        gameEndState.showNextTxt(count);
    },

    //TODO: déplacer cette fonction dans une classe ou fonction séparée
    showNextTxt: (count) => {
        let txtObj = game.add.bitmapText(0, 0, "pixel_font", gameEndState.txt[count], 28);
        txtObj.maxWidth = 650;


        txtObj.alignIn(game.world, Phaser.TOP_LEFT, -100, -count * 80 - 100);
        // debugger;
        let txtTween = game.add.tween(txtObj);
        txtObj.alpha = 0;
        txtTween.to({ alpha: 1 });
        txtTween.start();
        if(count <= gameEndState.txt.length){
            txtTween.onComplete.add(() => {
                gameEndState.showNextTxt(count + 1);
            }, this);
        }else{
            let btn = game.add.button(0,0,"wide_buttons", () => {
                game.state.start("game");
            }, this, 0,1,2,0);
            btn.scale.setTo(3);
            btn.alignIn(game.world, Phaser.CENTER, 0, 100);

            // let txt = game.make.bitmapText();

            btn.alpha = 0;
            let btnTween = game.add.tween(btn);
            btnTween.to({alpha:1});
            btnTween.start();
            btnTween.onComplete.add(() => {
                
            }, this);

        }
        
    }
}