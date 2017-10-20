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

        this.dialog = game.add.group();

        //sélection de quel sprite de la spritesheet selon l'endroit du site
        let cX = game.world.centerX;
        let cY = game.world.centerY;

        let x = this.pos.x;
        let y = this.pos.y;

        console.log(x, cX, y, cY);

        let posProps = {}; //propriétés de la boîte de dialogue dépendant de l'emplacement du site de production
        //propriétés par default: celle du quadrant 0
        posProps.quad = 0;
        posProps.anch = {x: 12/128, y: 0};
        posProps.bOff = 16; //décallage de base de la bôite de dialogue
        posProps.offY = posProps.bOff;
        posProps.btnsOffY = 22;
        

        if(x > cX){
            if(y > cY){
                posProps.quad = 3;
                posProps.anch = {x: 1 - 12/128, y: 1};
                posProps.offY = - posProps.bOff;
                posProps.btnsOffY = 6;            
            }else{
                posProps.quad = 1;
                posProps.anch = {x: 1 - 12/128, y: 0};
                //rien à modifier pour offY et btnsOffY
            }
        }else{
            if(y > cY){
                posProps.quad = 2;
                posProps.anch = {x: 12/128, y: 1};
                posProps.offY = - posProps.bOff;
                posProps.btnsOffY = 6;
            }
            //pas de 'else' parce que ça serait les props par défault
        }

        
        let box = game.make.sprite(0,0,"unUpBox", posProps.quad);
        box.scale.setTo(2);
        box.anchor.setTo(posProps.anch.x, posProps.anch.y); // met l'ancre au bout de la pointe de la boîte
        box.x = this.pos.x;
        box.y = this.pos.y + posProps.offY;
        this.dialog.add(box);

        let close = game.make.button(0,0, "closeButton", () => {
            this._closeDialogBox();
        }, this, 0,1,2,0);
        close.anchor.setTo(.5);
        let ofs = -6;
        close.alignIn(box, Phaser.TOP_RIGHT, ofs, -posProps.btnsOffY);

        this.dialog.add(close);

    }
    _closeDialogBox(){
        globals.sites.dialogDisplayed = "";

        this.dialog.callAll("destroy");
        this.dialog.children[0].pendingDestroy = true; //petit 'trick' pour détruire le bouton qui permet de fermer la fenêtre d'upgrade
        this.dialog.destroy();
    }

}