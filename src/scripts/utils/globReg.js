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
	this.zoom = game.add.tween(gameEls.earthMap);

}

globReg.update = function(){
	for(let region of this.regions){
		if(region.poly.contains(game.input.x, game.input.y) && this.canZoom && game.input.activePointer.isDown){
			let mp = region.poly.midPoint();

			let scale = region.scale;
			let d = {
				x: -(mp.x - game.world.centerX),
				y: -(mp.y - game.world.centerY)
			};
			let D = {
				x: scale * d.x,
				y: scale * d.y
			};

			console.log(gameEls.earthMap.height);
			

			this.zoom.to({
				x: game.world.centerX + D.x,
				y: game.world.centerY + D.y,
				width: gameEls.earthMap.width*scale,
				height: gameEls.earthMap.height*scale
			}, 1000, "Quad.easeIn");


			this.zoom.start();
			this.zoom.onComplete.add(function(){
				var dial = new Dialog([`Bienvenue en ${region.name}`]);
				dial.start();
			}, this);

			this.canZoom = false;
		}
	}
	
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
}