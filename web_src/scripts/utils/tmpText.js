function showTmpText(str, size, yOff){
    if(yOff == undefined){
        yOff = 0;
    }

    let txt = game.add.bitmapText(0, 0, "pixel_font", str, size);
    txt.alpha = 0;
    txt.alignIn(game.world, Phaser.CENTER, 0, yOff);

    let txtTween = game.add.tween(txt);
    txtTween.to({ alpha: 1 }, 750, Phaser.Easing.Bounce.lnOut, true, 0, 0, true);
}