class Newspaper{
    /**
    * @param {string} template - Type de newspaper
    * @param {object} data - Contenu du newspaper
    */
    constructor(template, data){
        if(gameEls.newspaper != undefined){
            gameEls.newspaper.stop();
        }

        gameEls.newspaper = this;

        switch (template) {
            case "smallSections":
                this._template = 0;
                break;
            case "firstPage":
                this._template = 1;
                break;
            default:

        }

        this._data = data;

        //groupe d'éléments
        this._els = game.add.group();
    }

    start(){
        //supprime l'affichage des sites de production si on est en vue "region" et rend la map invisible
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].uninit(true);
        }

        gameEls.earthMap.visible = false;


        let newspaper = game.make.image(0,0, "newspaper", this._template);
        newspaper.scale.setTo(4);
        newspaper.alignIn(game.world, Phaser.CENTER, 12);
        this._els.add(newspaper);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.scale.setTo(2);
        closeBtn.alignIn(newspaper, Phaser.TOP_RIGHT, -18, -10);
        this._els.add(closeBtn);

        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title, 80); //x,y,font,text,size
        if(this._template == 0){
            title.size = 40;
        }else if (this._template == 1) {
            title.size = 60;
        }
        title.tint = 0x55472f;
        title.alignIn(newspaper, Phaser.TOP_CENTER, 0, -48);
        this._els.add(title);
    }

    stop(){
        this._els.destroy();
        gameEls.newspaper = undefined;

        gameEls.earthMap.visible = true;
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].init();
        }

    }
}
