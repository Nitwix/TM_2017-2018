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
        this.siteButton.setFrames(this.fac.iconIndex, this.fac.iconIndex, this.fac.iconIndex, this.fac.iconIndex);
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

        //permet de pouvoir switcher d'un smallDialog à un autre sans devoir refermer le précédent
        globals.sites.dialogDisplayed = this.id;

        let x = this.pos.x;
        let y = this.pos.y;

        let txt = {};
        if(this.fac.type == "notUsed" && this.fac.level == 0){ //si le site de production est verouillé
            txt.title = "Déverouiller?";
            txt.descr = "Ceci vous permettra d'installer un bâtiment sur cet emplacement.";
            txt.price = new MoneyDisplay(10000);

            this._dialog = new SmallDialog(x, y, txt.title, txt.descr, txt.price.prettyStr(), () => {
                // console.log("Unlock callback called");
                globals.moneyMgr.buy(txt.price.val, () => {
                    this.fac.level++;
                    this.updateBtnFrames();
                });
            });

            this._dialog.start();
        }else{

            // this._newspaper = new Newspaper("smallSections", globals.data.factories);
            // this._newspaper.start();
        }

    }

    _closeDialogBox(){
        globals.sites.dialogDisplayed = "";

        this._dialog.stop();
    }
}
