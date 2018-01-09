class Newspaper{
    /**
    * @param {string} template - Type de newspaper
    * @param {object} data - Contenu du newspaper
    */
    constructor(template, data, comingFrom){
        // let dataSmallSections = {
        //     title: "",
        //     spritesheet: "",
        //     els: [
        //         {(factoryType: "" | spriteIndex: 0), title: "", descr: "", posCB: () => {}}
        //     ]
        // }
        //
        // let dataFirstPage = {
        //     title: "",
        //     els: [
        //         {descr: ""}
        //     ]
        // }

        gameEls.stopTmpEls();

        switch (template) {
            case "smallSections":
                this._template = 0;
                this._pageIndex = 0;
                this._elsPerPage = 3;
                let tmpMaxPage = Math.floor(data.els.length / this._elsPerPage);
                this._maxPageIndex = (data.els.length%this._elsPerPage === 0) ? tmpMaxPage - 1 : tmpMaxPage; //parce que la numérotation commence à 0

                this._CONSTANTS = {
                    descrMaxWidth: 350
                };
            break;
            case "firstPage":
                this._template = 1;
            break;
            default:
                console.warn("template not found in classes/newspaper.js");
        }

        this._data = data;

        //l'objet d'où vient la requête du newspaper
        this._comingFrom = comingFrom;

        //éléments de base qui restent entre les changements de page
        this._baseEls = game.add.group();
        //éléments qui changent lorsqu'on change de page
        this._contentEls = game.add.group();

        //contient toutes les propriétés liées au positionnement des éléments
        this._posProps = {}

        this._tweenProps = {
            lDur: globals.UI.longTweenDur, //long duration
            sDur: globals.UI.shortTweenDur //short duration
        };

        this._fontTint = 0x55472f;
    }

    _purposeSpecificMods(el){

        switch(this._data.purpose){
            //éléments spécifiques à la page d'achat des usines
            case "factoryShop":
                el.posTxt = el.fac.constructionPrice.toReadableStr();
                el.posCB = () => {
                    globals.moneyMgr.buy(el.fac.constructionPrice, () => {
                        this._comingFrom.fac = el.fac.copy();
                        globals.productionMgr.totCO2Produced += el.fac.grayCO2;
                        gameEls.newspaper.stop();
                    });
                };
                break;
            case "factoryResearch":
                el.posTxt = el.fac.researchPrice.toReadableStr();
                el.posCB = () => {
                    globals.moneyMgr.buy(el.fac.researchPrice, () => {
                        // console.log(`You invested ${el.fac.researchPrice} in research for ${el.fac.type}`);
                        globals.researchMgr.augmentUnlockProb(el.fac.type);
                        showTmpText("Votre investissement a bien été pris en compte", 32, 184);
                    });
                };
                break;
            default:
                console.log("no mods made to el in newspaper purposeSpecificMods");
        }
    }

    start(){
        gameEls.stopTmpEls();

        //attribue l'objet newspaper à gameEls.newspaper
        gameEls.newspaper = this;

        //supprime l'affichage des sites de production si on est en vue "region" et rend la map invisible
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].uninit(true);
        }

        let EMTween = game.add.tween(gameEls.earthMap);
        EMTween.to({alpha:0}, this._tweenProps.lDur);
        EMTween.start();
        //gameEls.earthMap.visible = false;

        this._newspaper = game.add.image(0,0, "newspaper", this._template);
        this._newspaper.scale.setTo(8);
        let mult = (Math.random() >= .5) ? 1 : -1;
        this._newspaper.angle = game.rnd.between(165,180) * mult;
        this._newspaper.anchor.setTo(.5);
        this._newspaper.alpha = .8;
        this._newspaper.alignIn(game.world, Phaser.CENTER, 0, 18);

        //TODO: (peut-être) : trouver un moyen d'avoir une plus grande rotation
        //newspaper scale tween
        let NPSTween = game.add.tween(this._newspaper.scale);
        NPSTween.to({x:4, y:4}, this._tweenProps.lDur);
        //newspaper tween
        let NPTween = game.add.tween(this._newspaper);
        NPTween.to({angle:0, alpha:1}, this._tweenProps.lDur, "Quad.easeIn");

        NPTween.start();
        NPSTween.start();

        NPSTween.onComplete.addOnce(() => {
            this._addBaseEls();
            this._addContentEls();

            game.world.bringToTop(this._baseEls);
            game.world.bringToTop(this._contentEls);

            this._fade(true);
        }, this);

        //this._baseEls.add(this._newspaper);
    }

    _addBaseEls(){
        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.scale.setTo(2);
        closeBtn.alignIn(this._newspaper, Phaser.TOP_RIGHT, -18, -10);
        this._baseEls.add(closeBtn);

        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title); //x,y,font,text,size

        if(this._template == 0){
            title.fontSize = 40;
            this._posProps.titleOffY = -12;

            this._posProps.headOffY = -64;
            this._posProps.sectionHeight = 100;
            this._posProps.offX = -32;

            if (this._maxPageIndex > 0) this._addChangePageBtn(true);

            this._pageNumber = game.make.bitmapText(0,0,"pixel_font", this._pageIndex+1, 24);
            this._pageNumber.alignIn(this._newspaper, Phaser.BOTTOM_CENTER, 0, -32);
            this._pageNumber.tint = this._fontTint;
            this._baseEls.add(this._pageNumber);
        }else if (this._template == 1) {
            title.fontSize = 80;
            this._posProps.titleOffY = -48;
        }

        title.tint = this._fontTint;
        title.alignIn(this._newspaper, Phaser.TOP_CENTER, 0, this._posProps.titleOffY);
        this._baseEls.add(title);

        //pour pouvoir tweener plus tard
        this._baseEls.alpha = 0;
    }

    _addChangePageBtn(next){
        let btn = game.make.button(0,0, "arrows", () => {
            this._changePage(next);
        }, this, 0, 1, 2, 0);
        btn.scale.setTo(2);
        let offX = -16, offY = -16, alignPos = Phaser.BOTTOM_RIGHT;
        if(!next){
            // btn.angle = 180;
            btn.anchor.setTo(.5);
            alignPos = Phaser.BOTTOM_LEFT;
            btn.setFrames(3,4,5,3);

            this._prevPageBtn = btn;
        }else{
            this._nextPageBtn = btn;
        }
        btn.alignIn(this._newspaper, alignPos, offX, offY);
        this._contentEls.add(btn); //simplifie la logique de changement de page
    }

    _changePage(next){
        this._contentEls.removeAll(true);
        if(next){
            this._pageIndex++;
        }else{
            this._pageIndex--;
        }

        if(this._pageIndex == this._maxPageIndex){
            this._addChangePageBtn(false);
        }else if (this._pageIndex == 0) {
            this._addChangePageBtn(true);
        }else{
            this._addChangePageBtn(false);
            this._addChangePageBtn(true);
        }

        this._pageNumber.text = this._pageIndex + 1;

        this._addContentEls();
        this._contentEls.alpha = 1;
    }

    _addContentEls(){
        if(this._template == 0){
            let i=this._pageIndex*this._elsPerPage;
            let max = this._elsPerPage+this._pageIndex*this._elsPerPage;
            for(i; i<max; i++){
                // debugger;
                let el = this._data.els[i];
                if (el == undefined) continue;
                this._addSection(parseInt(i%this._elsPerPage), el);
            }
        }else{
            for(let index in this._data.els){
                let el = this._data.els[index];
                this._addColumn(index, el);
            }
        }

        //pour pouvoir tweener plus tard
        this._contentEls.alpha = 0;
    }



    _addSection(index, el){

        this._purposeSpecificMods(el);

        //positionnement par raport au TOP_LEFT
        let offY = this._posProps.headOffY - index * this._posProps.sectionHeight;
        let offX = this._posProps.offX;

        let icon = game.make.image(0,0,this._data.spritesheet, el.spriteIndex);
        icon.scale.setTo(2);
        icon.alignIn(this._newspaper, Phaser.TOP_LEFT, offX, offY);
        this._contentEls.add(icon);

        let sectionTitle = game.make.bitmapText(0,0,"pixel_font", el.title, 32);
        sectionTitle.alignTo(icon, Phaser.TOP_RIGHT, sectionTitle.width + 15, -4);
        sectionTitle.tint = this._fontTint;
        this._contentEls.add(sectionTitle);

        let descr = game.make.bitmapText(0,0,"pixel_font", el.descr, 20);
        descr.alignTo(sectionTitle, Phaser.BOTTOM_LEFT, 0, 16);
        descr.tint = this._fontTint;
        descr.maxWidth = this._CONSTANTS.descrMaxWidth;
        this._contentEls.add(descr);

        if(el.posTxt && el.negTxt){ //si'l faut mettre un bouton dans la section
            this._addPosBtn(icon, el, true);
            this._addNegBtn(icon, el, false);
        }else if (el.posTxt) {
            this._addPosBtn(icon, el, false);
        }else if (el.negTxt) {
            this._addNegBtn(icon, el, false);
        }
    }

    _addPosBtn(icon, el, isAbove){
        let posBtn = this._mkBtn(icon, isAbove, false, el.posCB);
        this._contentEls.add(posBtn);

        let posTxt = this._mkTxt(el.posTxt, posBtn);
        this._contentEls.add(posTxt);
    }

    _addNegBtn(icon, el, isAbove){
        let negBtn = this._mkBtn(icon, isAbove, true, el.negCB);
        this._contentEls.add(negBtn);

        let negTxt = this._mkTxt(el.negTxt, negBtn);
        this._contentEls.add(negTxt);
    }

    _mkBtn(icon, isAbove, isNeg, callback){
        let offY = (isAbove) ? -32 : 0;
        let idx = (isNeg) ? 3 : 0;
        let btn = game.make.button(0,0, "pos_neg", () => {
            if(callback) callback();
        }, this, idx, 1 + idx,2 + idx, idx);
        btn.scale.setTo(2);
        btn.alignTo(icon, Phaser.BOTTOM_RIGHT, this._CONSTANTS.descrMaxWidth + 120, -24 + offY);
        return btn;
    }

    _mkTxt(txt, btn){
        let bmTxt = game.make.bitmapText(0, 0, "pixel_font", txt, globals.UI.posBtnFontSize);
        bmTxt.alignIn(btn, Phaser.CENTER, 1, -3);
        return bmTxt;
    }

    //TODO: faire la fonction pour ajouter une colonne au newspaper
    _addColumn(){

    }

    //fade les éléments des différents groupes
    _fade(fadeIn){
        if(fadeIn){
            let BETween = game.add.tween(this._baseEls);
            BETween.to({alpha:1}, this._tweenProps.sDur);
            BETween.start();

            let CETween = game.add.tween(this._contentEls);
            CETween.to({alpha:1}, this._tweenProps.sDur);
            CETween.start();
        }else{
            let NPTween = game.add.tween(this._newspaper);
            NPTween.to({alpha:0}, this._tweenProps.sDur);
            NPTween.start();

            NPTween.onComplete.addOnce(() => {
                this._newspaper.destroy();
            }, this);

        }

    }

    stop(){

        //ferme un éventuel dialog qui serait resté ouvert
        if(gameEls.dialog != undefined){
            gameEls.dialog.stop();
        }

        if (globals.currentRegion != "") {
            globals.regions[globals.currentRegion].init(true);
        }

        //TODO: appeler des fonction pour fade out les éléments joliments
        this._baseEls.destroy();
        this._contentEls.destroy();
        this._fade(false);

        gameEls.newspaper = undefined;

        // gameEls.earthMap.visible = true;
        let EMTween = game.add.tween(gameEls.earthMap);
        EMTween.to({alpha:1}, this._tweenProps.sDur);
        EMTween.start();
        // EMTween.onComplete.addOnce(() => {
        //     //On ne peut pas init onComplete car sinon, lorsqu'on passe de newspaper à newspaper, la région s'uninit 2x de suite puis s'init sur le nouveau newspaper

        //     // if(globals.currentRegion != ""){
        //     //     globals.regions[globals.currentRegion].init(true);
        //     // }
        // }, this);
    }
}
