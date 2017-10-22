class SmallDialog{
	constructor(x, y, title, bPoints, posTxt, negTxt){
		this._pos = new Phaser.Point(x,y);
		this._title = title;
		this._bPoints = bPoints;
		this._posTxt = posTxt;
		this._negTxt = negTxt;
	}

	open(){
		//TODO: terminer de refactorer ce code !
		this._dialog = game.add.group();

        //sélection de quel sprite de la spritesheet selon l'endroit du site
        let cX = game.world.centerX;
        let cY = game.world.centerY;

        let x = this._pos.x;
        let y = this._pos.y;

        let posProps = {}; //propriétés de la boîte de dialogue dépendant de l'emplacement du site de production
        
        posProps.bOff = 16; //hauteur de la 'flèche' de la boîte de dialogue
        
        /* Les quadrants sont définis de la manière suivante:
            0 | 1
           ---|---
            2 | 3
            */

            if(y > cY){
            	if(x > cX){
            		posProps.quad = 3;
            	}else{
            		posProps.quad = 2;
            	}
            }else{
            	if(x > cX){
            		posProps.quad = 1;
            	}else{
            		posProps.quad = 0;
            	}
            }

        //met l'a boîte du quadrant par défault si possible
        let mOff = 10, bW = 128, bH = 64, scl = 2;
        let cRect = new Phaser.Rectangle(mOff+12*scl, mOff+bH*scl, cX*2 - 116*scl, cY*2 - (bH*scl + mOff));
        if(cRect.contains(x,y)){
        	posProps.quad = 2;
        }

        let q01YOff = -22, q23YOff = -6;
        switch(posProps.quad){
        	case 0:
        	posProps.anch = {x: 12/128, y: 0};
        	posProps.offY = posProps.bOff;
        	posProps.cntOffY = q01YOff;
        	break;

        	case 1:
        	posProps.anch = {x: 1 - 12/128, y: 0};
        	posProps.offY = posProps.bOff;
        	posProps.cntOffY = q01YOff;  
        	break;

        	case 2:
        	posProps.anch = {x: 12/128, y: 1};
        	posProps.offY = - posProps.bOff;
        	posProps.cntOffY = q23YOff;
        	break;

        	case 3:
        	posProps.anch = {x: 1 - 12/128, y: 1};
        	posProps.offY = - posProps.bOff;
        	posProps.cntOffY = q23YOff;
        	break;

        	default:
        	console.warn(`${posProps.quad} is not a proper quadrant in classes/SmallDialog.js`);
        }

        let box = game.make.sprite(0,0,"unUpBox", posProps.quad);
        box.scale.setTo(scl);
        box.anchor.setTo(posProps.anch.x, posProps.anch.y); // met l'ancre au bout de la pointe de la boîte
        box.x = this.pos.x;
        box.y = this.pos.y + posProps.offY;
        this._dialog.add(box);

        let close = game.make.button(0,0, "closeButton", () => {
        	this._closeDialogBox();
        }, this, 0,1,2,0);
        close.anchor.setTo(.5);
        let ofs = -6;
        close.alignIn(box, Phaser.TOP_RIGHT, ofs, posProps.cntOffY);
        this._dialog.add(close);

        let txt = {};
        let dType = ""; //type de boîte de dialogue (unlocking || upgrading)
        if(this.res.type == "notUsed" && this.res.level == 0){ //si le site de production est verouillé
        	dType = "unlock";

        	txt.title = "Déverouiller?";
        	txt.bPoints = ["Vous pourrez ainsi installer une usine sur ce site."];
        }else{
        	dType = "upgrade";

        	txt.title = "Améliorer?";
        }

        let title = game.make.bitmapText(0,0,"pixel_font",txt.title, 30); //x,y,font,text,size
        title.alignIn(box, Phaser.TOP_LEFT, 2*ofs, posProps.cntOffY - 4);
        this._dialog.add(title);

        let unlEls = {}; //éléments spécifiques au déverouillage
        let upgEls = {}; //éléments spécifiques à l'amélioration
        if(dType == "unlock"){
        	unlEls.btn = game.make.button(0,0, "pos_neg", () => {
        		console.log("unlocked");
        	}, this, 0,1,2,0);
        	unlEls.btn.scale.setTo(2);
        	unlEls.btn.alignIn(box, Phaser.BOTTOM_RIGHT, ofs + 2, posProps.cntOffY + posProps.offY);
        	this._dialog.add(unlEls.btn);

        	unlEls.price = game.make.bitmapText(0,0,"pixel_font", "50K M", 26);
        	unlEls.price.alignIn(unlEls.btn, Phaser.CENTER, 1, -4);
        	this._dialog.add(unlEls.price);
        }
    }

    close(){
    	this._dialog.callAll("destroy");
        this._dialog.children[0].pendingDestroy = true; //petit 'trick' pour détruire le bouton qui permet de fermer la fenêtre d'upgrade
        this._dialog.destroy();
    }


}