//fonctionne au mieux dans un espace de 96*32 px
class MoneyDisplay{
    constructor(val, size, mondioCol, inABox, objToAlignIn, alignPos, offX, offY){
        this._val = val;
        if(arguments.length == 1){
            return;
        }

        this.group = game.add.group();

        let box = game.make.image(0,0,"mondioBox");
        box.alignIn(objToAlignIn, alignPos, offX, offY);
        box.scale.setTo(2);
        if(inABox){ // affiche la box seulement si inABox == true
            this.group.add(box);
        }

        this._text = game.make.bitmapText(0,0,"pixel_font",this.prettyStr(val), size);
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

        this._mondioLogo.alignIn(box, Phaser.RIGHT_CENTER, 12);
        this.group.add(this._mondioLogo);
    }

    get val(){
        return this._val;
    }

    prettyStr(val){
        let kilo = "k", Mega = "M", Giga = "G", Tera = "T";
        if(val < 10**4){
            return val;
        }else if (val < 10**5) {
            return (val / 10**3).toFixed(2) + kilo;
        }else if (val < 10**6) {
            return (val / 10**3).toFixed(1) + kilo;
        }else if (val < 10**7) {
            return (val / 10**6).toFixed(3) + Mega;
        }else if (val < 10**8) {
            return (val / 10**6).toFixed(2) + Mega;
        }else if (val < 10**9) {
            return (val / 10**6).toFixed(1) + Mega;
        }
    }

    updateVal(newVal){
        // modifie le text
        this._text.text = this.prettyStr(newVal);

        // met à jour la position du logo mondio
        // this._mondioLogo.alignTo(this._text, Phaser.RIGHT_CENTER, 6, 6);

        // debugger;
    }


}
