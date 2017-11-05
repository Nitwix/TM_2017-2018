class Region{
    constructor(name, scale, regPoints, prodPoints){
        this._name = name;
        this._poly = makePoly(regPoints);
        this._scale = scale;

        let mp = this._poly.midPoint();

        //d et D sont des vecteurs directions pour le zoom
        this.d = {
            x: game.world.centerX - mp.x,
            y: game.world.centerY - mp.y
        };
        this.D = {
            x: scale * this.d.x,
            y: scale * this.d.y
        };

        //objet contenant les sites de production
        this.sites = {};

        //crée les sites de production (ne les ajoute pas encore au game)
        for(let p in prodPoints){
            let point = prodPoints[p];

            //ce site de production (par exemple s1,s2,s3,...)
            let id = "s"+globals.sites.id;
            this.sites[id] = new Site(id, point[0],point[1], "notUsed", 0); //voir classes/sites.js

            globals.sites.id++;
        }
    }

    get name(){
        return this._name;
    }

    get poly(){
        return this._poly;
    }

    get scale(){
        return this._scale;
    }

    get zoomDuration(){
        return this._scale * 150;
    }

    init(onlySites){
        if(onlySites != true){
            this._worldButton = game.add.button(0,0,"buttons", function(){
                globReg.goto.world(this);
            }, this, 6,7,8,6);
            this._worldButton.scale.setTo(globals.UI.smallButtonScale);
            this._worldButton.alignTo(gameEls.fsButt, Phaser.BOTTOM_CENTER, 0, globals.UI.buttonOffset);
        }

        //affiche les sites de production
        for(let s in this.sites){
            this.sites[s].add();
        }
    }

    uninit(onlySites){
        if(onlySites != true){
            this._worldButton.destroy();
        }

        //détruit l'affichage des sites de production
        for(let s in this.sites){
            this.sites[s].del();
        }
    }
}