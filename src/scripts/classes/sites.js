class Site{
    constructor(id, x, y, resType, resLvl){
        this.id = id;
        this.pos = new Phaser.Point(x, y);
        this.res = new Resource(resType, resLvl); //voir utils/resources.js
    }

    //ajoute le site au game
    add(){
        let icon;
        switch(this.res.type){
            case "notUsed":
                icon = this.res.level; //0: locked, 1: not used
                break;
            case "coal":
                icon = globals.sites.maxLevel + this.res.level;
                break;
                //ajouter les autres types de resources ici
            default:
                console.warn("Resource not found in classes/sites.js");
        }
        this.siteButton = game.add.button(this.pos.x,
                                          this.pos.y,
                                          "resources", 
                                          () => {
            this._dialogBox();
        }, this,icon, icon, icon, icon);
        this.siteButton.anchor.setTo(.5);
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
        if(this.res.type == "notUsed" && this.res.level == 0){ //si le site de production est verouillé
            dType = "unlock";

            txt.title = "Déverouiller?";
            txt.descr = "Ceci vous permettra d'installer un bâtiment sur cet emplacement.";
            txt.price = "100K M";
        }else{
            dType = "upgrade";

            txt.title = "Améliorer?";
            txt.descr = "Votre usine aura telle et telle caractéristique améliorée";
        }

        let x = this.pos.x;
        let y = this.pos.y;
        
        if(dType == "unlock"){
            this._dialog = new SmallDialog(x, y, txt.title, txt.descr, txt.price, () => {
                console.log("Unlock callback called");
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