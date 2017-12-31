class Site{
    constructor(id, x, y, facType, facLvl, unlockPrice){
        this.id = id;
        this.pos = new Phaser.Point(x, y);
        this._fac = new Factory(facType, facLvl); //voir classes/factory.js
        this._unlockPrice = unlockPrice;

        globals.sites.instances.push(this);
    }

    //ajoute le site au game
    add(){
        this._gGroup = game.add.group();
        this.siteButton = game.make.button(this.pos.x, this.pos.y, "factories", this._onClick, this);
        // this.siteButton.scale.setTo(1.5);
        // console.log(this._fac.type);
        this.updateBtnFrames();
        this.siteButton.anchor.setTo(.5);
        this._gGroup.add(this.siteButton);

        let animData = this._fac.animData;
        if(animData != undefined){
            let facAnimSprite = game.make.sprite(this.pos.x + animData.offX, this.pos.y + animData.offY, animData.name);
            facAnimSprite.anchor.setTo(.5);
            facAnimSprite.scale = (animData.scale == undefined) ? new Phaser.Point(1,1) : animData.scale;
            this._gGroup.add(facAnimSprite);


            let facAnim = facAnimSprite.animations.add('facAnim', null, 8, true);
            facAnim.play();
            // this._gGroup.add(facAnim);
        }


    }

    updateBtnFrames(){
        let idx = this._fac.iconIndex;
        this.siteButton.setFrames(idx, idx, idx, idx);
    }

    //détruis le bouton du site de production
    del(){
        this._gGroup.destroy();
    }

    // NOTE: ce setter n'appelle pas updateBtnFrames car sinon ça crée un bug lorsqu'on achète une usine depuis newspaper.js
    // la méthode updateBtnFrames serait appelée avant que les boutons des usines soient crées
    set fac(facObj){
        this._fac = facObj;
    }

    get fac(){
        return this._fac;
    }

    upgradeFac(){
        this.fac.upgrade();
        this.updateBtnFrames();
    }

    destroyFac(){
        this.fac = new Factory("notUsed", 1);
        this.updateBtnFrames();
    }

    unlockSite(){
        this.fac.level++;
        this.updateBtnFrames();
    }

    //affiche la boîte qui permet de déverouiller le site de production ou de l'améliorer
    _onClick(){
        //pour qu'un seul élément ne soit affiché à la fois
        gameEls.stopTmpEls();

        let x = this.pos.x;
        let y = this.pos.y;

        let txt = {};
        if(this.fac.type == "notUsed" && this.fac.level == 0){ //si le site de production est verouillé
            let dialDat = {
                x: x, y: y,
                title: "Déverouiller?",
                descr: "Ceci vous permettra d'installer une centrale sur cet emplacement.",
                posTxt: this._unlockPrice.toReadableStr(),
                posCB: () => {
                    // console.log("Unlock callback called");
                    globals.moneyMgr.buy(this._unlockPrice, () => {
                        this.unlockSite();
                        this._showFacShop();
                    })
                },
            };
            this._dialog = new SmallDialog(dialDat);

            this._dialog.start();
        }else if(this.fac.type == "notUsed" && this.fac.level == 1){
            this._showFacShop();
        }else{
            let upgPrc = this._fac.upgradePrice;
            let desPrc = this._fac.destructionPrice;
            let dialDat = {
                x:x, y:y,
                title: "Améliorer?",
                descr: "Votre usine produira plus. Vous pouvez également la détruire.",
                posTxt: upgPrc.toReadableStr(),
                posCB: () => {
                    globals.moneyMgr.buy(upgPrc, () => {
                        this.upgradeFac();
                    });
                },
                negTxt: desPrc.toReadableStr(),
                negCB: () => {
                    globals.moneyMgr.buy(desPrc, () => {
                        this.destroyFac();
                    });
                }
            };

            if(!this.fac.canUpgrade){
                dialDat.title = "Amélioration impossible";
                dialDat.descr = "Voulez-vouz détruire cette usine?";

                dialDat.posTxt = undefined;
                dialDat.posCB = undefined;

                dialDat.negTxt = desPrc.toReadableStr();
                dialDat.negCB = () => {
                        globals.moneyMgr.buy(desPrc, () => {
                            this.destroyFac();
                        });
                };
            }
            this._dialog = new SmallDialog(dialDat);
            this._dialog.start();
        }

    }

    _showFacShop(){
        let newspaper = new Newspaper("smallSections", globals.data.factoryShop, this);
        newspaper.start();
    }

    _closeDialogBox(){
        globals.sites.dialogDisplayed = "";

        this._dialog.stop();
    }
}
