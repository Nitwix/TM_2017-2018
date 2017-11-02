class DisplayMoney{
    constructor(valStr, size, mondioCol, objToAlignIn, alignPos, offX, offY){
        this.group = game.add.group();

        let box = game.make.image(0,0,"mondioBox");
        box.alignIn(objToAlignIn, alignPos, offX, offY);
        this.group.add(box);

        let text = game.make.bitmapText(0,0,"pixel_font",valStr, size);
        // text.tint = 0x999999;
        text.alignIn(box, Phaser.CENTER, -8, -8);
        this.group.add(text);

        let id;
        switch (mondioCol) {
            case "green":
                id = 0;
                break;
            case "gray":
                id = 1;
                break;
        }

        let mondioLogo = game.make.image(0,0, "mondioLogo", id);
        // mondioLogo.scale.setTo(2);
        mondioLogo.alignTo(text, Phaser.RIGHT_BOTTOM, 6, 6);
        this.group.add(mondioLogo);
    }

    updateStr(newStr){
        this.group.childAt(0).text = newStr;
    }


}
