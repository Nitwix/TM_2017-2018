class Newspaper{
    /**
    * @param {string} title - Titre du journal
    * @param {boolean} empty - Afficher les traits des sections ou pas?
    */
    constructor(title, empty){
        if(gameEls.newspaper != undefined){
            gameEls.newspaper.stop();
        }

        gameEls.newspaper = this;

        this._title = title;
        this._empty = empty;

        //groupe d'éléments
        this._els = game.add.group();
    }

    start(){
        //TODO: supprimer earthMap, les boutons des sites de production
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].uninit(true);
        }else{
            gameEls.earthMap.visible = false;
        }


        let imgIndex;
        if(!this._empty){
            imgIndex = 0;
        }else{
            imgIndex = 1;
        }
        let newspaper = game.make.image(0,0, "newspaper", imgIndex);
        newspaper.scale.setTo(4);
        newspaper.alignIn(game.world, Phaser.CENTER, 12);
        this._els.add(newspaper);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.scale.setTo(2);
        closeBtn.alignIn(newspaper, Phaser.TOP_RIGHT, -18, -10);
        this._els.add(closeBtn);

        let title = game.make.bitmapText(0,0,"pixel_font",this._title, 40); //x,y,font,text,size
        title.tint = 0x55472f;
        title.alignIn(newspaper, Phaser.TOP_CENTER, 0, -12);
        this._els.add(title);
    }

    stop(){
        this._els.destroy();
        gameEls.newspaper = undefined;

        if(globals.currentRegion == ""){
            gameEls.earthMap.visible = true;
        }else{
            globals.regions[globals.currentRegion].init();
        }
    }
}
