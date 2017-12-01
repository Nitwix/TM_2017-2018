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
        this.siteButton = game.add.button(this.pos.x, this.pos.y, "factories", () => {
            this._dialogBox();
        }, this);
        // this.siteButton.scale.setTo(2);
        this.updateBtnFrames();
        this.siteButton.anchor.setTo(.5);
    }

    updateBtnFrames(){
        this.siteButton.setFrames(this.fac.iconIndex, this.fac.iconIndex, this.fac.iconIndex, this.fac.iconIndex);
    }

    //détruis le bouton du site de production
    del(){
        this.siteButton.destroy();
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
        this.fac = new Factory("notUsed", 1); //production negative pour diminuer la production d'énergie
        this.updateBtnFrames();
    }

    unlockSite(){
        this.fac.level++;
        this.updateBtnFrames();
    }

    //affiche la boîte qui permet de déverouiller le site de production ou de l'améliorer
    _dialogBox(){
        //pour qu'une seule boîte de dialog soit affichée
        if(gameEls.smallDialog != undefined){
            gameEls.smallDialog.stop();
        }

        let x = this.pos.x;
        let y = this.pos.y;

        let txt = {};
        if(this.fac.type == "notUsed" && this.fac.level == 0){ //si le site de production est verouillé
            let dialDat = {
                x: x, y: y,
                title: "Déverouiller?",
                descr: "Ceci vous permettra d'installer un bâtiment sur cet emplacement.",
                posTxt: this._unlockPrice.toReadableStr(),
                posCB: () => {
                    // console.log("Unlock callback called");
                    globals.moneyMgr.buy(this._unlockPrice, () => {
                        this.unlockSite();
                    })
                },
            };
            this._dialog = new SmallDialog(dialDat);

            this._dialog.start();
        }else if(this.fac.type == "notUsed" && this.fac.level == 1){
            this._newspaper = new Newspaper("smallSections", globals.data.factories, this);
            this._newspaper.start();
        }else{
            let upgPrc = this._fac.upgradePrice;
            let desPrc = this._fac.destructionPrice;
            let dialDat = {
                x:x, y:y,
                title: "Améliorer?",
                descr: "Votre usine produira plus.",
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
                dialDat.title = "Erreur";
                dialDat.descr = "Vous ne pouvez pas améliorer cette usine d'avantage";
                dialDat.posTxt = undefined;
                dialDat.posCB = undefined;
            }

            this._dialog = new SmallDialog(dialDat);
            this._dialog.start();
        }

    }

    _closeDialogBox(){
        globals.sites.dialogDisplayed = "";

        this._dialog.stop();
    }
}
