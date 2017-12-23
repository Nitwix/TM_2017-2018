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

        if(gameEls.newspaper != undefined){
            gameEls.newspaper.stop();
        }

        switch (template) {
            case "smallSections":
                this._template = 0;
                this._pageIndex = 0;
                this._elsPerPage = 3;
                this._maxPageIndex = Math.floor(data.els.length / this._elsPerPage); //parce que la numérotation commence à 0
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

    start(){
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

            this._addChangePageBtn(true);

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

        //éléments spécifiques à la page d'achat des usines
        if(this._data.spritesheet == "factories"){
            //TODO: modifier pour passer tous les arguments nécessaires à classes/factory.js
            // let fac = new Factory(el.factoryType, 0); //affiche tjs une image de niveau 1
            el.spriteIndex = el.fac.iconIndex;
            // debugger;
            el.posTxt = el.constructionPrice.toReadableStr();
            el.posCB = () => {
                globals.moneyMgr.buy(el.constructionPrice, () => {
                    gameEls.newspaper.stop();
                    this._comingFrom.fac = el.fac.copy();
                });
            }
        }


        //positionnement par raport au TOP_LEFT
        let offY = this._posProps.headOffY - index * this._posProps.sectionHeight;
        let offX = this._posProps.offX;

        let factIcon = game.make.image(0,0,this._data.spritesheet, el.spriteIndex);
        factIcon.scale.setTo(2);
        factIcon.alignIn(this._newspaper, Phaser.TOP_LEFT, offX, offY);
        this._contentEls.add(factIcon);

        let sectionTitle = game.make.bitmapText(0,0,"pixel_font", el.title, 32);
        sectionTitle.alignTo(factIcon, Phaser.TOP_RIGHT, sectionTitle.width + 15, -4);
        sectionTitle.tint = this._fontTint;
        this._contentEls.add(sectionTitle);

        let descr = game.make.bitmapText(0,0,"pixel_font", el.descr, 20);
        descr.alignTo(sectionTitle, Phaser.BOTTOM_LEFT, 0, 16);
        descr.tint = this._fontTint;
        descr.maxWidth = 350;
        this._contentEls.add(descr);

        let posBtn = game.make.button(0,0,"pos_neg", () => {
            el.posCB();
        }, this, 0,1,2,0);
        posBtn.alignTo(factIcon, Phaser.BOTTOM_RIGHT, descr.maxWidth + 64, -24);
        posBtn.scale.setTo(2);
        this._contentEls.add(posBtn);

        let posTxt = game.make.bitmapText(0,0,"pixel_font", el.posTxt, globals.UI.posBtnFontSize);
        posTxt.alignIn(posBtn, Phaser.CENTER, 1, -3);
        this._contentEls.add(posTxt);
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

        //TODO: appeler des fonction pour fade out les éléments joliments
        this._baseEls.destroy();
        this._contentEls.destroy();
        this._fade(false);

        gameEls.newspaper = undefined;

        // gameEls.earthMap.visible = true;
        let EMTween = game.add.tween(gameEls.earthMap);
        EMTween.to({alpha:1}, this._tweenProps.sDur);
        EMTween.start();
        EMTween.onComplete.addOnce(() => {
            if(globals.currentRegion != ""){
                globals.regions[globals.currentRegion].init(true);
            }
        }, this);



    }
}
