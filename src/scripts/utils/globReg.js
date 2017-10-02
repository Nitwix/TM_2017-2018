var globReg = {};

globReg.init = function(){
	this.regGraphics = game.add.graphics(0,0);

	this.polys = []; //array contenant les polygones des différentes régions

	this.euroPoly = this._makePoly([[382,163], [355,106], [455,98], [443, 132], [464, 157]]);
	//console.log(this.euroPoly.points);
	this.polys.push(this.euroPoly);
	
	/*this.regGraphics.beginFill(0xff33ff);
	this.regGraphics.drawPolygon(this.euroPoly.points);
	this.regGraphics.endFill();*/

	this.regGraphics.beginFill(0x000000);
	var cEur = this.euroPoly.midPoint();
	this.regGraphics.drawCircle(cEur.x,cEur.y, 5);
	this.regGraphics.endFill();


	this.canZoom = true;
	this.zoom = game.add.tween(gameEls.earthMap.scale);
	this.move = game.add.tween(gameEls.earthMap);

	this.zoom.onComplete.add(function(){
		//globReg.canZoom = true; ben non !
	}, this);
}

globReg.update = function(){
	for(let poly of this.polys){
		if(poly.contains(game.input.x, game.input.y) && this.canZoom){
			var mp = poly.midPoint();
			console.log(mp);
			var scale = 4;

			this.zoom.to({
				x: scale, y: scale
			});
			this.move.to({
				x: (2**.5)*(game.world.width - mp.x),
				y: (2**.5)*(game.world.height - mp.y)
			});
			console.log(game.world.width - mp.x, game.world.height - mp.y);

			this.zoom.start();
			this.zoom.onComplete.add(function(){
				this.move.start()
			}, this);

			this.canZoom = false;
			console.log("zoomed");
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