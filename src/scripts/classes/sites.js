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
                                          function(){
            this._unlockDialog();
        },
                                          this,icon, icon, icon, icon);
        this.siteButton.anchor.setTo(.5);
    }


    //détruis le bouton du site de production
    del(){
        this.siteButton.destroy(); 
    }

    //affiche la boîte qui permet de déverouiller le site de production
    _unlockDialog(){
        if(globals.sites.dialogDisplayed != ""){
            let cR = globals.regions[globals.currentRegion];
            cR.sites[globals.sites.dialogDisplayed]._closeUnlockDialog();
        }
        
        globals.sites.dialogDisplayed = this.id;
        this.unlockDialog = game.add.group();

        //todo : dessiner plusieurs boîtes de dialogue avec plusieurs orientations pour que ça rentre tjs dans le canvas
        let box = game.make.image(0,0,"unUpBox");
        box.scale.setTo(2);
        box.anchor.setTo(12/128, 1); // met l'ancre au bout de la pointe de la boîte
        box.x = this.pos.x;
        box.y = this.pos.y - 16;
        this.unlockDialog.add(box);

        let close = game.make.button(0,0, "closeButton", () => {
            this._closeUnlockDialog();
        }, this, 0,1,2,0);
        let ofs = -6;
        close.alignIn(box, Phaser.TOP_RIGHT, ofs, ofs);

        this.unlockDialog.add(close);

    }
    _closeUnlockDialog(){
        globals.sites.dialogDisplayed = "";

        this.unlockDialog.callAll("destroy");
        this.unlockDialog.children[0].pendingDestroy = true; //petit 'trick' pour détruire le bouton qui permet de fermer la fenêtre d'upgrade
        this.unlockDialog.destroy();
    }

}