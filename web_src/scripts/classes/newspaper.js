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

        //contient toutes les propriétés liées au positionnement des éléments
        this._posProps = {};
    }

    start(){
        //supprime l'affichage des sites de production si on est en vue "region" et rend la map invisible
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].uninit(true);
        }

        gameEls.earthMap.visible = false;

        this._newspaper = game.make.image(0,0, "newspaper", this._template);
        this._newspaper.scale.setTo(4);
        this._newspaper.alignIn(game.world, Phaser.CENTER, 12);
        this._els.add(this._newspaper);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.scale.setTo(2);
        closeBtn.alignIn(this._newspaper, Phaser.TOP_RIGHT, -18, -10);
        this._els.add(closeBtn);

        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title); //x,y,font,text,size

        if(this._template == 0){
            title.fontSize = 40;
            this._posProps.titleOffY = -12;

            //TODO: ajuster ces constantes
            this._posProps.headOffY = -48;
            this._posProps.sectionHeight = 25;
            this._posProps.offX = -16;

            for(let index in this._data.els){
                let el = this._data.els[index];
                this._addSection(index, el);
            }

        }else if (this._template == 1) {
            title.fontSize = 80;
            this._posProps.titleOffY = -48;

            for(let index in this._data.els){
                let el = this._data.els[index];
                this._addColumn(index, el);
            }

        }
        title.tint = 0x55472f;
        title.alignIn(this._newspaper, Phaser.TOP_CENTER, 0, this._posProps.titleOffY);
        this._els.add(title);



    }

    //TODO: faire la fonction pour ajouter une section (horizontale) au newspaper
    _addSection(index, el){
        //positionnement par raport au TOP_LEFT
        let offY = this._posProps.headOffY - index * this._posProps.sectionHeight;
        let offX = this._posProps.offX;

        let factIcon = game.make.image(0,0,this._data.spritesheet, el.spriteIndex);
        factIcon.scale.setTo(2);
        factIcon.alignIn(this._newspaper, Phaser.TOP_LEFT, offX, offY);
        this._els.add(factIcon);
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
