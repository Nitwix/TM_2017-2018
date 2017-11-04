class Site{
    constructor(id, x, y, facType, facLvl){
        this.id = id;
        this.pos = new Phaser.Point(x, y);
        this.fac = new Factory(facType, facLvl); //voir classes/factory.js
    }

    //ajoute le site au game
    add(){
        this.siteButton = game.add.button(this.pos.x, this.pos.y, "factories", () => {
            this._dialogBox();
        }, this);
        this.updateBtnFrames();
        this.siteButton.anchor.setTo(.5);
    }

    updateBtnFrames(){
        this.siteButton.setFrames(this.iconIndex, this.iconIndex, this.iconIndex, this.iconIndex);

    }

    get iconIndex(){
        switch(this.fac.type){
            case "notUsed":
                return this.fac.level; //0: locked, 1: not used
            case "coal":
                return globals.sites.maxLevel + this.fac.level;
                //ajouter les autres types de resources ici
            default:
                console.warn("facource not found in classes/sites.js");
        }
    }

    //détruis le bouton du site de production
    del(){
        this.siteButton.destroy();
    }

    //affiche la boîte qui permet de déverouiller le site de production ou de l'améliorer
    _dialogBox(){
        if(globals.sites.dialogDisplayed != ""){
            let cR = globals.regions[globals.currentRegion];
            cR.sites[globals.sites.dialogDisplayed]._closeDialogBox();
        }

        globals.sites.dialogDisplayed = this.id;

        let txt = {};
        let dType = ""; //type de boîte de dialogue (unlock || upgrade)
        if(this.fac.type == "notUsed" && this.fac.level == 0){ //si le site de production est verouillé
            dType = "unlock";

            txt.title = "Déverouiller?";
            txt.descr = "Ceci vous permettra d'installer un bâtiment sur cet emplacement.";
            txt.price = new MoneyDisplay(10000);
        }else{
            dType = "upgrade";

            txt.title = "Améliorer?";
            txt.descr = "Votre usine aura telle et telle caractéristique améliorée";
        }

        let x = this.pos.x;
        let y = this.pos.y;

        if(dType == "unlock"){
            this._dialog = new SmallDialog(x, y, txt.title, txt.descr, txt.price.prettyStr(txt.price.val), () => {
                console.log("Unlock callback called");
                globals.moneyMgr.buy(txt.price.val, () => {
                    console.log("Site unlocked");
                    this.fac.level++;
                    this.updateBtnFrames();
                });
            });
        }else if(dType == "upgrade"){
            this._dialog = new SmallDialog(x, y, txt.title, txt.descr, txt.price, () => {
                console.log("Unlock callback called");
            }, "negText", () => {
                console.log("Negative callback called");
            });
        }

        this._dialog.open();
    }

    _closeDialogBox(){
        globals.sites.dialogDisplayed = "";

        this._dialog.close();
    }
}
