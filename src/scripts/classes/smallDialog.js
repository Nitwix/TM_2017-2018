class SmallDialog{
    constructor(x, y, title, descr, posTxt, posCallback, negTxt, negCallback){
        this._pos = new Phaser.Point(x,y);
        this._title = title;
        this._descr = descr;
        this._posTxt = posTxt;
        this._posCB = posCallback;
        this._negTxt = negTxt;
        this._negCB = negCallback;
    }

    open(){
        //TODO: terminer de refactorer ce code !
        this._dialog = game.add.group();

        //sélection de quel sprite de la spritesheet selon l'endroit du site
        let cX = game.world.centerX;
        let cY = game.world.centerY;

        let x = this._pos.x;
        let y = this._pos.y;

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
        let mOff = 10, bW = 128, bH = 64, scl = 2;
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
        this._box.x = this._pos.x;
        this._box.y = this._pos.y + this._posProps.offY;
        this._dialog.add(this._box);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.close();
        }, this, 0,1,2,0);
        closeBtn.anchor.setTo(.5);
        this._posProps.cntOffX = -6;
        closeBtn.alignIn(this._box, Phaser.TOP_RIGHT, this._posProps.cntOffX, this._posProps.cntOffY);
        this._dialog.add(closeBtn);


        let title = game.make.bitmapText(0,0,"pixel_font",this._title, 30); //x,y,font,text,size
        title.alignIn(this._box, Phaser.TOP_LEFT, 2*this._posProps.cntOffX, this._posProps.cntOffY - 4);
        this._dialog.add(title);

        if(this._posTxt != undefined && this._negTxt == undefined){ //si que bouton vert
            this._addPosBtn(false);    
        }else{ //bouton vert et rouge
            this._addPosBtn(true);
            this._addNegBtn(false);
        }

        this._addDescr();

        //TODO (maybe): ajouter la possibilité de n'avoir qu'un seul bouton négatif
    }

    _addDescr(){
        if(this._descr.length > 68){
            console.warn("Text pourrait être trop long dans classes/smallDialog.js");
        }
        let descr = game.make.bitmapText(0,0, "pixel_font", this._descr, 20);
        
        descr.maxWidth = this._box.width - 112;
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
        }, this, idx, 1 + idx,2 + idx, idx);
        btn.scale.setTo(2);
        btn.alignIn(this._box, Phaser.BOTTOM_RIGHT, this._posProps.cntOffX + 2, this._posProps.cntOffY + offY);
        return btn;
    }

    _mkTxt(txt, btn){
        let bmTxt = game.make.bitmapText(0,0,"pixel_font", txt, 26);
        bmTxt.alignIn(btn, Phaser.CENTER, 1, -4);
        return bmTxt;
    }

    _addPosBtn(above){
        let posBtn = {};
        posBtn.btn = this._mkBtn(above, false, this._posCB);
        this._dialog.add(posBtn.btn);

        posBtn.txt = this._mkTxt(this._posTxt, posBtn.btn);
        this._dialog.add(posBtn.txt);
    }

    _addNegBtn(above){
        let negBtn = {};
        negBtn.btn = this._mkBtn(above, true, this._negCB);
        this._dialog.add(negBtn.btn);

        negBtn.txt = this._mkTxt(this._negTxt, negBtn.btn);
        this._dialog.add(negBtn.txt);
    }

    close(){
        this._dialog.callAll("destroy");
        if(this._dialog.children.length > 0){
            this._dialog.children[0].pendingDestroy = true; //petit 'trick' pour détruire le bouton qui permet de fermer la fenêtre d'upgrade
        }

        this._dialog.destroy();
    }
}