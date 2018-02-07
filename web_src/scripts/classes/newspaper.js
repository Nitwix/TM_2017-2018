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

    get data(){
        return this._data;
    }

    /*just a method to test the feasability of updating the newspaper while it's displayed
    -> ça pourrait très bien marcher :D
    TODO:
    - mettre à jour la data de façon plus générale
    - mettre alpha = 0 uniquement lorsqu'on veut faire un tween (dans addContentEls)
    - ajouter les boutons de changement de page de façon plus générale

    */

    totalUpdate(newData){
        this._data = newData;

        this._contentEls.removeAll(true);
        this._addContentEls();

        // this._addChangePageBtns();
    }

    softUpdate(newData){
        this._data = newData;
        // this._data = newData || this._data;

        let i = this._pageIndex * this._elsPerPage;
        let max = this._elsPerPage + this._pageIndex * this._elsPerPage;
        let sCount = 0;
        for (i; i < max; i++) {
            let section = this._displayedSections[sCount];
            console.log(section);
            let el = this._data.els[i];
            this._purposeSpecificMods(el);

            //update la visibilité
            for (let key in section) {
                let displayEl = section[key];
                if (!displayEl) continue; //quand negBtn n'existe pas par exemple
                displayEl.visible = (el) ? true : false;
            }
            sCount++;

            if(!el) continue;
            
            section.icon.frame = el.spriteIndex;
            section.title.text = el.title;

            section.descr.text = el.descr;
            if(section.posTxt){
                section.posTxt.text = el.posTxt;
                section.posBtn.onInputUp.removeAll();
                section.posBtn.onInputUp.add(el.posCB, this);
            }
            if(section.negTxt){
                section.negTxt.text = el.negTxt;
                section.negBtn.onInputUp.removeAll();
                section.negBtn.onInputUp.add(el.negCB, this);
            }

        }
    }

    _purposeSpecificMods(el){

        switch(this._data.purpose){
            //éléments spécifiques à la page d'achat des usines
            case "factoryShop":
                el.posTxt = el.fac.constructionPrice.toReadableStr();
                el.posCB = () => {
                    globals.moneyMgr.buy(el.fac.constructionPrice, () => {
                        this._comingFrom.fac = el.fac.copy();
                        // globals.productionMgr.totCO2 += el.fac.grayCO2;
                        gameEls.newspaper.stop();
                    });
                };
                el.descr = el.fac.getDescr("factoryShop");
                break;
            case "factoryResearch":
                el.posTxt = el.fac.researchPrice.toReadableStr();
                el.posCB = () => {
                    globals.moneyMgr.buy(el.fac.researchPrice, () => {
                        // console.log(`You invested ${el.fac.researchPrice} in research for ${el.fac.type}`);
                        globals.researchMgr.increaseUnlockProb(el.fac.type);
                        // showTmpText("Votre investissement a bien été pris en compte", 32, 184);
                    });
                };
                el.descr = el.fac.getDescr("factoryResearch");
                break;
            default:
                // console.log(el);
        }
    }

    start(){
        gameEls.stopTmpEls();

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
            game.input.enabled = true; //réactive l'input 

            //attribue l'objet newspaper à gameEls.newspaper
            gameEls.newspaper = this;

            this._addBaseEls();
            this._createSections();

            game.world.bringToTop(this._baseEls);
            game.world.bringToTop(this._contentEls);
            this._bringSectionsToTop();

            // this._fade(true);
        }, this);

        this._baseEls.add(this._newspaper);
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

            this._pageNumber = game.make.bitmapText(0,0,"pixel_font", this._pageIndex+1, 24);
            this._pageNumber.alignIn(this._newspaper, Phaser.BOTTOM_CENTER, 0, -32);
            this._pageNumber.tint = this._fontTint;
            this._baseEls.add(this._pageNumber);

            this._addChangePageBtn(true);
            this._addChangePageBtn(false);

            this._updateChangePageBtns();
            
        }else if (this._template == 1) {
            title.fontSize = 80;
            this._posProps.titleOffY = -48;
        }

        title.tint = this._fontTint;
        title.alignIn(this._newspaper, Phaser.TOP_CENTER, 0, this._posProps.titleOffY);
        this._baseEls.add(title);

        //pour pouvoir tweener plus tard
        // this._baseEls.alpha = 1;
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
        this._baseEls.add(btn); //simplifie la logique de changement de page
    }


    _updateChangePageBtns(){
        if(this._maxPageIndex <= 0){
            this._nextPageBtn.visible = false;
            this._prevPageBtn.visible = false;
        }else if (this._pageIndex == this._maxPageIndex) {
            this._nextPageBtn.visible = false;
            this._prevPageBtn.visible = true;
        } else if (this._pageIndex == 0) {
            this._nextPageBtn.visible = true;
            this._prevPageBtn.visible = false;
        } else {
            this._nextPageBtn.visible = true;
            this._prevPageBtn.visible = true;
        }
    }

    //TODO: changer next en forward pour plus de clarté
    _changePage(next){
        // this._contentEls.removeAll(true);
        if(next){
            this._pageIndex++;
        }else{
            this._pageIndex--;
        }

        this._updateChangePageBtns();
        this.softUpdate(this._data);

        this._pageNumber.text = this._pageIndex + 1;

        // this._addContentEls();
    }

    //appelé *une seule fois* dans start!
    _createSections(){
        this._displayedSections = [];
        if (this._template == 0) {
            for (let i=0; i<this._elsPerPage; i++) {
                // debugger;
                let el = this._data.els[i];
                if (el == undefined) continue;
                let cEl = this._createSection(i, el);
                this._displayedSections.push(cEl);
            }
        } else {
            //TODO
        }
    }

    //appelé trois fois au total dans createContentEls!
    _createSection(index, el){
        this._purposeSpecificMods(el);

        let section = {
            icon: null,
            title: null,
            descr: null,

            posBtn: null,
            posTxt: null,

            negBtn: null, 
            negTxt: null
        };


        //positionnement par raport au TOP_LEFT
        let offY = this._posProps.headOffY - index * this._posProps.sectionHeight;
        let offX = this._posProps.offX;

        let icon = game.make.image(0, 0, this._data.spritesheet, el.spriteIndex);
        icon.scale.setTo(2);
        icon.alignIn(this._newspaper, Phaser.TOP_LEFT, offX, offY);
        section.icon = icon;

        let sectionTitle = game.make.bitmapText(0, 0, "pixel_font", el.title, 32);
        sectionTitle.alignTo(icon, Phaser.TOP_RIGHT, sectionTitle.width + 15, -4);
        sectionTitle.tint = this._fontTint;
        section.title = sectionTitle;

        let descr = game.make.bitmapText(0, 0, "pixel_font", el.descr, 20);
        descr.alignTo(sectionTitle, Phaser.BOTTOM_LEFT, 0, 16);
        descr.tint = this._fontTint;
        descr.maxWidth = this._CONSTANTS.descrMaxWidth;
        section.descr = descr;

        let posRet, negRet;
        if (el.posTxt && el.negTxt) { //si'l faut mettre un bouton dans la section
            posRet = this._createPosBtn(icon, el, true);
            negRet = this._createNegBtn(icon, el, false);
        } else if (el.posTxt) {
            posRet = this._createPosBtn(icon, el, false);
        } else if (el.negTxt) {
            negRet = this._createNegBtn(icon, el, false);
        }

        if(posRet){
            section.posBtn = posRet[0];
            section.posTxt = posRet[1];
        }
        if(negRet){
            section.negBtn = negRet[0];
            section.negTxt = negRet[1];
        }

        for(let key in section){
            if(!section[key]) continue;
            game.add.existing(section[key]);
        }

        return section;
    }

    _bringSectionsToTop(){
        for(let section of this._displayedSections){
            for (let key in section) {
                if (!section[key]) continue;
                game.world.bringToTop(section[key]);
            }
        }
        
    }

    _createPosBtn(icon, el, isAbove) {
        let posBtn = this._mkBtn(icon, isAbove, false, el.posCB);

        let posTxt = this._mkTxt(el.posTxt, posBtn);
        return [posBtn, posTxt];
    }

    _createNegBtn(icon, el, isAbove) {
        let negBtn = this._mkBtn(icon, isAbove, true, el.negCB);

        let negTxt = this._mkTxt(el.negTxt, negBtn);
        return [negBtn, negTxt];
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
    // _fade(fadeIn){
    //     if(fadeIn){
    //         let BETween = game.add.tween(this._baseEls);
    //         BETween.to({alpha:1}, this._tweenProps.sDur);
    //         BETween.start();

    //         let CETween = game.add.tween(this._contentEls);
    //         CETween.to({alpha:1}, this._tweenProps.sDur);
    //         CETween.start();
    //     }else{
    //         let NPTween = game.add.tween(this._newspaper);
    //         NPTween.to({alpha:0}, this._tweenProps.sDur);
    //         NPTween.start();

    //         NPTween.onComplete.addOnce(() => {
    //             this._newspaper.destroy();
    //         }, this);

    //     }
    // }

    _destroyDisplayedSections(){
        this._displayedSections.forEach((section) =>{
            for(let key in section){
                let el = section[key];
                if(!el) continue;
                el.destroy();
            }
        });
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
        this._destroyDisplayedSections();
        // this._newspaper.destroy();
        // this._fade(false);

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
