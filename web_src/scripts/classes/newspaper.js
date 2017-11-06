class Newspaper{
    /**
    * @param {string} template - Type de newspaper
    * @param {object} data - Contenu du newspaper
    */
    constructor(template, data){
        // let dataSmallSections = {
        //     title: "",
        //     spritesheet: "",
        //     els: [
        //         {imgCache: 0, title: "", descr: "", posCB: () => {}}
        //     ]
        // }
        //
        // let dataFirstPage = {
        //     title: "",
        //     els: [
        //         {descr: ""}
        //     ]
        // }

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

        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title); //x,y,font,text,size

        //ATTENTION: data de title.data n'a rien à voir avec this._data
        title.data.offY;
        if(this._template == 0){
            title.fontSize = 40;
            title.data.offY = -12;
        }else if (this._template == 1) {
            title.fontSize = 80;
            title.data.offY = -48;
        }
        title.tint = 0x55472f;
        title.alignIn(newspaper, Phaser.TOP_CENTER, 0, title.data.offY);
        this._els.add(title);

        for(let el of this._data.els){

        }
    }

    //TODO: faire la fonction pour ajouter une section (horizontale) au newspaper
    _addSection(){

    }

    //TODO: faire la fonction pour ajouter une colonne au newspaper
    _addColumn(){

    }


    stop(){
        //BUG: lorsqu'on dézoom après avoir ouvert le newspaper pour acheter une usine, les sites de production ne disparaissent pas
        this._els.destroy();
        gameEls.newspaper = undefined;

        gameEls.earthMap.visible = true;
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].init(true);
        }

    }
}
