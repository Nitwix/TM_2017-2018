//globReg s'occupe de la gestion des transitions entre l'état "vue globale" et l'état "vue régionale" 
var globReg = {};

globReg.init = function(){
    this.regGraphics = game.add.graphics(0,0);

    globals.regions.europe = new Region("Europe", 6, 
        [[382,163], [355,106], [455,98], [443, 132], [464, 157]], 
        [[240,184], [273, 239], [349,257]]); //voir définition dans utils/regions.js

    globals.regions.africa = new Region("Afrique", 3, 
        [[343, 164], [436, 354], [513, 233], [454, 165]], 
        [[246,120], [459, 200]]);

    globals.regions.southAmerica = new Region("Amérique du Sud", 3, [[269, 197], [348, 229], [270, 363], [233, 231]], []);
    
    globals.regions.northAmerica = new Region("Amérique du Nord", 3, [[111, 107], [383, 76], [268, 195], [158, 197]], []);

    for(let region in globals.regions){
        let regionObj = globals.regions[region];
        //pour parcourir seulement les propriétés ajoutées à la classe Object
        if (!regionObj instanceof Region) {
            delete regionObj;
            continue;
        }
        continue; //commenter cette ligne pour voir les polygones définissant les régions
        this.regGraphics.beginFill(0xff33ff);
        this.regGraphics.drawPolygon(regionObj.poly.points);
        this.regGraphics.endFill();

        this.regGraphics.beginFill(0x000000);
        var cEur = regionObj.poly.midPoint();
        this.regGraphics.drawCircle(cEur.x,cEur.y, 5);
        this.regGraphics.endFill();
    }


    this.canZoom = true;
}

globReg.update = function(){
    for(let region in globals.regions){
        let regionObj = globals.regions[region];
        //pour parcourir seulement les propriétés ajoutées à la classe Object
        if (!regionObj instanceof Region) {
            delete regionObj;
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
    }, region.zoomDuration, "Quad.easeIn");


    this.zoom.start();
    this.zoom.onComplete.add(function(){
        region.init();
    }, this);

    globReg.canZoom = false;
}

globReg.goto.world = function(region){
    this.unzoom = game.add.tween(gameEls.earthMap);

    let scale = region.scale;

    this.unzoom.to({
        x: game.world.centerX,
        y: game.world.centerY,
        width: gameEls.earthMap.width/scale,
        height: gameEls.earthMap.height/scale
    }, region.zoomDuration, "Quad");

    this.unzoom.onComplete.add(function(){
        globReg.canZoom = true;
    }, this);

    this.unzoom.start();

    region.uninit();
}