var globReg = {};

globReg.init = function(){
	this.regGraphics = game.add.graphics(0,0);

	this.regions = []; //array contenant les polygones des différentes régions

	this.europe = new Region("Europe", [[382,163], [355,106], [455,98], [443, 132], [464, 157]]);

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
			var mp = region.poly.midPoint();

			var scale = 6;
			var d = {
				x: -(mp.x - game.world.centerX),
				y: -(mp.y - game.world.centerY)
			};
			var D = {
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
				//
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
	constructor(name, points){
		this._name = name;
		this._poly = globReg._makePoly(points);
	}

	get name(){
		return this._name;
	}

	get poly(){
		return this._poly;
	}
}