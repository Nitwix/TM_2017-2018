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

	return {x:mx, y:my};
}

class Region{
    constructor(name, scale, points){
        this._name = name;
        this._poly = makePoly(points);
        this._scale = scale;

        let mp = this._poly.midPoint();

        //d et D sont des vecteurs directions pour le zoom
        this._d = {
            x: -(mp.x - game.world.centerX),
            y: -(mp.y - game.world.centerY)
        };
        this._D = {
            x: scale * this.d.x,
            y: scale * this.d.y
        };
    }

    get d(){
        return this._d;
    }

    get D(){
        return this._D;
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

    init(){
        this._worldButton = game.add.button(0,0,"buttons", function(){
            globReg.goto.world(this);
        }, this, 6,7,8,6);
        this._worldButton.scale.setTo(2);
        cornerObj(this._worldButton, globals.UI.buttonOffset, "se");
    }

    uninit(){
        //TODO : réussir à faire disparaître ce bouton
        this._worldButton.destroy();
    }
}

