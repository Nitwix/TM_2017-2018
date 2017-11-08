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
        //pour qu'une seule boîte de dialog soit affichée
        if(gameEls.smallDialog != undefined){
            gameEls.smallDialog.stop();
        }

        let x = this.pos.x;
        let y = this.pos.y;

        let txt = {};
        if(this.fac.type == "notUsed" && this.fac.level == 0){ //si le site de production est verouillé
            let price = 10000;
            let dialDat = {
                x: x,
                y: y,
                title: "Déverouiller?",
                descr: "Ceci vous permettra d'installer un bâtiment sur cet emplacement.",
                posTxt:(new MoneyDisplay(price)).prettyStr(),
                posCB: () => {
                    // console.log("Unlock callback called");
                    globals.moneyMgr.buy(price, () => {
                        this.fac.level++;
                        this.updateBtnFrames();
                    })
                }
            };
            this._dialog = new SmallDialog(dialDat);

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
