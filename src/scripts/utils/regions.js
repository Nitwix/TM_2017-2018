//fonction utilitaire pour transformer un array de points en Phaser.Polygon
function makePoly(points){
    var polyString = "[";
    for(let point of points){
        polyString += `new Phaser.Point(${point[0]},${point[1]}),`;
    }
    polyString = polyString.substr(0,polyString.length -1) + "]";
    var poly = new Phaser.Polygon(eval(polyString));
    return poly;
}

/*prototype de Phaser.Polygon permettant de calculer le point central d'un polygone*/
Phaser.Polygon.prototype.midPoint = function(){
    var sx = 0, sy = 0;
    for(let point of this.points){
        sx += point.x;
        sy += point.y;
    }

    var mx = sx / this.points.length;
    var my = sy / this.points.length;

    return {x: mx, y: my};
}

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
            let site = this.sites["s"+globals.sites.index] = {};

            //position du site
            site.pos = new Phaser.Point(point[0], point[1]);
            //ressource du site
            site.res = new Resource("coal", 1); //voir utils/resources.js
            //ajoute le site au game
            site.add = function(){
                let icon;
                switch(site.res.type){
                    case "empty":
                        icon = site.res.level; //0 : empty, 1: locked
                        break;
                    case "coal":
                        icon = globals.sites.maxLevel + site.res.level;
                        break;
                    //ajouter les autres types de resources ici
                    default:
                        console.log("Resource not found in utils/regions.js");
                }

                site.button = game.add.button(site.pos.x,
                                              site.pos.y,
                                              "resources", 
                                              function(){
                    console.log(site.res.type);
                },
                                              this,icon, icon, icon, icon);
                site.button.anchor.setTo(.5);
            };
            //détruis le bouton du site de production
            site.del = function(){
                site.button.destroy();
            };

            globals.sites.index++;
        }

        console.log(this);
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
        return this._scale * 200;
    }

    init(){
        this._worldButton = game.add.button(0,0,"buttons", function(){
            globReg.goto.world(this);
        }, this, 6,7,8,6);
        this._worldButton.scale.setTo(2);
        cornerObj(this._worldButton, globals.UI.buttonOffset, "se");

        //affiche les sites de production
        for(let s in this.sites){
            this.sites[s].add();
        }
    }

    uninit(){
        //TODO : réussir à faire disparaître ce bouton
        this._worldButton.destroy();

        for(let s in this.sites){
            this.sites[s].del();
        }
    }
}

