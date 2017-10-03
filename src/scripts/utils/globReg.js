var globReg = {};

globReg.init = function(){
	this.regGraphics = game.add.graphics(0,0);

	this.regions = []; //array contenant les différentes régions

	this.europe = new Region("Europe", 6, [[382,163], [355,106], [455,98], [443, 132], [464, 157]]); //voir définition ci-dessous

	this.regions.push(this.europe);
	
	/*this.regGraphics.beginFill(0xff33ff);
	this.regGraphics.drawPolygon(this.euroPoly.points);
	this.regGraphics.endFill();*/

	/*this.regGraphics.beginFill(0x000000);
	var cEur = this.euroPoly.midPoint();
	this.regGraphics.drawCircle(cEur.x,cEur.y, 5);
	this.regGraphics.endFill();*/
	this.canZoom = true;
}

globReg.update = function(){
	for(let region of this.regions){
		if(region.poly.contains(game.input.x, game.input.y) && this.canZoom && game.input.activePointer.isDown){
			this.goto.region(region);
		}
	}
}

globReg.goto = {};

globReg.goto.region = function(region){

	this.zoom = game.add.tween(gameEls.earthMap);

	let mp = region.poly.midPoint();

	let scale = region.scale;
	let d = region.d;
	let D = region.D;	

	this.zoom.to({
		x: game.world.centerX + D.x,
		y: game.world.centerY + D.y,
		width: gameEls.earthMap.width*scale,
		height: gameEls.earthMap.height*scale
	}, 1000, "Quad.easeIn");


	this.zoom.start();
	this.zoom.onComplete.add(function(){
		region.init();
	}, this);

	this.canZoom = false;
}

globReg.goto.world = function(region){
	this.unzoom = game.add.tween(gameEls.earthMap);

	let scale = region.scale;
	this.unzoom.to({
		x: game.world.centerX,
		y: game.world.centerY,
		width: gameEls.earthMap.width/scale,
		height: gameEls.earthMap.height/scale
	}, 1000, "Quad");

	this.unzoom.start();
	region.uninit();
	this.unzoom.onComplete.add(function(){
		
	}, this);
}

/*fonction interne pour créer des polygones
	points : array de points
*/
globReg._makePoly = function(points){
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
		this._poly = globReg._makePoly(points);
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