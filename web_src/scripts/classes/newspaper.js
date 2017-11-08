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

        //éléments de base qui restent entre les changements de page
        this._baseEls = game.add.group();
        //éléments qui changent lorsqu'on change de page
        this._contentEls = game.add.group();

        //contient toutes les propriétés liées au positionnement des éléments
        this._posProps = {};

        this._fontTint = 0x55472f;
    }

    start(){
        //attribue l'objet newspaper à gameEls.newspaper
        gameEls.newspaper = this;

        //supprime l'affichage des sites de production si on est en vue "region" et rend la map invisible
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].uninit(true);
        }

        gameEls.earthMap.visible = false;

        this._newspaper = game.make.image(0,0, "newspaper", this._template);
        this._newspaper.scale.setTo(4);
        this._newspaper.alignIn(game.world, Phaser.CENTER, 12);
        this._baseEls.add(this._newspaper);

        let closeBtn = game.make.button(0,0, "closeButton", () => {
            this.stop();
        }, this, 0,1,2,0);
        closeBtn.scale.setTo(2);
        closeBtn.alignIn(this._newspaper, Phaser.TOP_RIGHT, -18, -10);
        this._baseEls.add(closeBtn);

        let title = game.make.bitmapText(0,0,"pixel_font",this._data.title); //x,y,font,text,size

        if(this._template == 0){
            title.fontSize = 40;
            this._posProps.titleOffY = -12;

            //TODO: ajuster ces constantes
            this._posProps.headOffY = -64;
            this._posProps.sectionHeight = 100;
            this._posProps.offX = -32;

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
        title.tint = this._fontTint;
        title.alignIn(this._newspaper, Phaser.TOP_CENTER, 0, this._posProps.titleOffY);
        this._baseEls.add(title);



    }

    //TODO: faire la fonction pour ajouter une section (horizontale) au newspaper
    _addSection(index, el){
        //positionnement par raport au TOP_LEFT
        let offY = this._posProps.headOffY - index * this._posProps.sectionHeight;
        let offX = this._posProps.offX;

        let factIcon = game.make.image(0,0,this._data.spritesheet, el.spriteIndex);
        factIcon.scale.setTo(2);
        factIcon.alignIn(this._newspaper, Phaser.TOP_LEFT, offX, offY);
        this._contentEls.add(factIcon);

        let sectionTitle = game.make.bitmapText(0,0,"pixel_font", el.title, 32);
        sectionTitle.alignTo(factIcon, Phaser.TOP_RIGHT, sectionTitle.width + 15, -4);
        sectionTitle.tint = this._fontTint;
        this._contentEls.add(sectionTitle);

        let descr = game.make.bitmapText(0,0,"pixel_font", el.descr, 20);
        descr.alignTo(sectionTitle, Phaser.BOTTOM_LEFT, 0, 16);
        descr.tint = this._fontTint;
        descr.maxWidth = 350;
        this._contentEls.add(descr);

        let posBtn = game.make.button(0,0,"pos_neg", () => {
            el.posCB();
        }, this, 0,1,2,0);
        posBtn.alignTo(factIcon, Phaser.BOTTOM_RIGHT, descr.maxWidth + 64, -24);
        posBtn.scale.setTo(2);
        this._contentEls.add(posBtn);

        let posTxt = game.make.bitmapText(0,0,"pixel_font", el.posTxt, globals.UI.posBtnFontSize);
        posTxt.alignIn(posBtn, Phaser.CENTER, 1, -3);
        this._contentEls.add(posTxt);
    }

    //TODO: faire la fonction pour ajouter une colonne au newspaper
    _addColumn(){

    }


    stop(){
        //BUG: lorsqu'on dézoom après avoir ouvert le newspaper pour acheter une usine, les sites de production ne disparaissent pas
        this._baseEls.destroy();
        this._contentEls.destroy();

        gameEls.newspaper = undefined;

        gameEls.earthMap.visible = true;
        if(globals.currentRegion != ""){
            globals.regions[globals.currentRegion].init(true);
        }

    }
}
