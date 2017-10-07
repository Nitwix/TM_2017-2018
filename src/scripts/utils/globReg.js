var globReg = {};

globReg.init = function(){
    this.regGraphics = game.add.graphics(0,0);

    globals.regions.europe = new Region("Europe", 6, [[382,163], [355,106], [455,98], [443, 132], [464, 157]]); //voir définition ci-dessus
    
    globals.regions.africa = new Region("Afrique", 3, [[343, 164], [436, 354], [513, 233], [454, 165]]);
    
    globals.regions.southAmerica = new Region("Amérique du Sud", 3, [[269, 237], [348, 229], [270, 343], [233, 231]]);

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
    for(let region in globals.regions){
        let regionObj = globals.regions[region];
        //pour parcourir seulement les propriétés ajoutées à la classe Object
        if (!globals.regions.hasOwnProperty(region)) {
            continue;
        }
        if(regionObj.poly.contains(game.input.x, game.input.y) && this.canZoom && game.input.activePointer.isDown){
            this.goto.region(regionObj);
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
        width: gameEls.earthMap.width/scale - 1, //à corriger: le scale ne revient pas exactement à son état d'origine
        height: gameEls.earthMap.height/scale -1
    }, 1000, "Quad");

    this.unzoom.onComplete.add(function(){
        //
    }, this);

    this.unzoom.start();

    region.uninit();
}