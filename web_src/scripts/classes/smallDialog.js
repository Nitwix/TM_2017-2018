class SmallDialog{
    constructor(data){
        this._data = data;
        this._data.pos = new Phaser.Point(data.x,data.y);
    }

    start(){
        if(gameEls.smallDialog != undefined){
            gameEls.smallDialog.stop();
        }
        gameEls.smallDialog = this;

        this._dialog = game.add.group();

        //sélection de quel sprite de la spritesheet selon l'endroit du site
        let cX = game.world.centerX;
        let cY = game.world.centerY;

        let x = this._data.pos.x;
        let y = this._data.pos.y;

        this._posProps = {}; //propriétés de la boîte de dialogue dépendant de l'emplacement du site de production

        this._posProps.bOff = 16; //hauteur de la 'flèche' de la boîte de dialogue

        /* Les quadrants sont définis de la manière suivante:
            0 | 1
           ---|---
            2 | 3
            */

        if(y > cY){
            if(x > cX){
                this._posProps.quad = 3;
            }else{
                this._posProps.quad = 2;
            }
        }else{
            if(x > cX){
                this._posProps.quad = 1;
            }else{
                this._posProps.quad = 0;
            }
        }

        //met l'a boîte du quadrant par défault si possible
        let mOff = 16, bW = 128, bH = 64, scl = 2;
        let cRect = new Phaser.Rectangle(mOff+12*scl, mOff+bH*scl, cX*2 - 116*scl, cY*2 - (bH*scl + mOff));
        if(cRect.contains(x,y)){
            this._posProps.quad = 2;
        }

        let q01YOff = -22, q23YOff = -6;
        switch(this._posProps.quad){
            case 0:
                this._posProps.anch = {x: 12/128, y: 0};
                this._posProps.offY = this._posProps.bOff;
                this._posProps.cntOffY = q01YOff;
                break;

            case 1:
                this._posProps.anch = {x: 1 - 12/128, y: 0};
                this._posProps.offY = this._posProps.bOff;
                this._posProps.cntOffY = q01YOff;
                break;

            case 2:
                this._posProps.anch = {x: 12/128, y: 1};
                this._posProps.offY = - this._posProps.bOff;
                this._posProps.cntOffY = q23YOff;
                break;

            case 3:
                this._posProps.anch = {x: 1 - 12/128, y: 1};
                this._posProps.offY = - this._posProps.bOff;
                this._posProps.cntOffY = q23YOff;
                break;

            default:
                console.warn(`${this._posProps.quad} is not a proper quadrant in classes/SmallDialog.js`);
        }

        this._box = game.make.sprite(0,0,"smallDBox", this._posProps.quad);
        this._box.scale.setTo(scl);
        this._box.anchor.setTo(this._posProps.anch.x, this._posProps.anch.y); // met l'ancre au bout de la pointe de la boîte
        this._box.x = this._data.pos.x;
        this._box.y = this._data.pos.y + this._posProps.offY;
        this._dialog.add(this._box);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.anchor.setTo(.5);
        this._posProps.cntOffX = -6;
        closeBtn.alignIn(this._box, Phaser.TOP_RIGHT, this._posProps.cntOffX, this._posProps.cntOffY);
        closeBtn.hitArea = new Phaser.Rectangle(-24, -28, 48, 48);
        this._dialog.add(closeBtn);


        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title, 30); //x,y,font,text,size
        title.alignIn(this._box, Phaser.TOP_LEFT, 2*this._posProps.cntOffX, this._posProps.cntOffY - 4);
        this._dialog.add(title);

        let descrWidth = this._box.width - 112;
        if(this._data.posTxt != undefined && this._data.negTxt != undefined){
            this._addPosBtn(true);
            this._addNegBtn(false);
        }else if(this._data.posTxt != undefined){
            this._addPosBtn(false);
        }else if(this._data.negTxt != undefined){
            this._addNegBtn(false);
        }else{
            descrWidth = this._box.width - 16;
        }
        // debugger;


        this._addDescr(descrWidth);

        this._dialog.alpha = 0;
        let SDTween = game.add.tween(this._dialog);
        SDTween.to({alpha:1}, globals.UI.shortTweenDur);
        SDTween.start();
    }

    _addDescr(descrWidth){
        if(this._data.descr.length > 68){
            console.warn("Text pourrait être trop long dans classes/smallDialog.js");
        }
        let descr = game.make.bitmapText(0,0, "pixel_font", this._data.descr, 20);

        descr.maxWidth = descrWidth;
        descr.alignIn(this._box, Phaser.TOP_LEFT, this._posProps.cntOffX - 6, this._posProps.cntOffY - 32);

        this._dialog.add(descr);
    }

    _mkBtn(above, isNeg, callback){
        let offY = this._posProps.offY;
        if(above){
            offY -= 32;
        }
        let idx = 0;
        if(isNeg){
            idx = 3;
        }
        let btn = game.make.button(0,0, "pos_neg", () => {
            callback();
            this.stop(); //ferme cette instance de SmallDialog
        }, this, idx, 1 + idx,2 + idx, idx);
        btn.scale.setTo(2);
        btn.alignIn(this._box, Phaser.BOTTOM_RIGHT, this._posProps.cntOffX + 2, this._posProps.cntOffY + offY);
        return btn;
    }

    _mkTxt(txt, btn){
        let bmTxt = game.make.bitmapText(0,0,"pixel_font", txt, globals.UI.posBtnFontSize);
        bmTxt.alignIn(btn, Phaser.CENTER, 1, -4);
        return bmTxt;
    }

    _addPosBtn(above){
        let posBtn = {};
        posBtn.btn = this._mkBtn(above, false, this._data.posCB);
        this._dialog.add(posBtn.btn);

        posBtn.txt = this._mkTxt(this._data.posTxt, posBtn.btn);
        this._dialog.add(posBtn.txt);
    }

    _addNegBtn(above){
        let negBtn = {};
        negBtn.btn = this._mkBtn(above, true, this._data.negCB);
        this._dialog.add(negBtn.btn);

        negBtn.txt = this._mkTxt(this._data.negTxt, negBtn.btn);
        this._dialog.add(negBtn.txt);
    }

    stop(){
        // TODO: faire le fade out quand on ferme le SmallDialog
        // BUG: lorsqu'on ferme le SmallDialog, le tween prend du temps et fait bugger l'apparition d'une nouvelle boîte
        // let SDTween = game.add.tween(this._dialog);
        // SDTween.to({alpha:0}, globals.UI.shortTweenDur);
        // SDTween.start();
        // SDTween.onComplet.addOnce(() => {
        //     this._dialog.destroy();
        //     gameEls.smallDialog = undefined;
        // }, this);

        this._dialog.destroy();
        gameEls.smallDialog = undefined;


        if(this._dialog.children.length > 0){
            this._dialog.children[0].pendingDestroy = true; //petit 'trick' pour détruire le bouton qui permet de fermer la fenêtre d'upgrade
        }
    }
}
