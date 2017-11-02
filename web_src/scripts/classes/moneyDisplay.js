//fonctionne au mieux dans un espace de 96*32 px
class MoneyDisplay{
    constructor(valStr, size, mondioCol, inABox, objToAlignIn, alignPos, offX, offY){
        this.group = game.add.group();

        let box = game.make.image(0,0,"mondioBox");
        box.alignIn(objToAlignIn, alignPos, offX, offY);
        box.scale.setTo(2);
        if(inABox){ // affiche la box seulement si inABox == true
            this.group.add(box);
        }


        this._text = game.make.bitmapText(0,0,"pixel_font",valStr, size);
        // text.tint = 0x999999;
        this._text.alignIn(box, Phaser.LEFT_CENTER, -8, -6);
        this.group.add(this._text);

        let id;
        switch (mondioCol) {
            case "green":
                id = 0;
                break;
            case "gray":
                id = 1;
                break;
        }

        this._mondioLogo = game.make.image(0,0, "mondioLogo", id);
        // this._mondioLogo.scale.setTo(2);
        this._mondioLogo.alignTo(this._text, Phaser.RIGHT_CENTER, 60, 6);
        this.group.add(this._mondioLogo);
    }

    updateStr(newStr){
        // modifie le text
        this._text.text = newStr;

        // met à jour la position du logo mondio
        // this._mondioLogo.alignTo(this._text, Phaser.RIGHT_CENTER, 6, 6);

        // debugger;
    }


}
