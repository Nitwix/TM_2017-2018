//globReg s'occupe de la gestion des transitions entre l'état "vue globale" et l'état "vue régionale"
var globReg = {};

globReg.init = function(){
    this.regGraphics = game.add.graphics(0,0);

    globals.regions.europe = new Region("europe", 6,
        [[382,163], [355,106], [455,98], [443, 132], [464, 157]],
        [[240,184], [273, 239], [349,257]]); //voir définition dans utils/regions.js

    globals.regions.africa = new Region("africa", 3,
        [[343, 164], [436, 354], [513, 233], [454, 165]],
        [[268, 44], [510, 57], [494, 169], [419, 370], [366, 226]]);

    globals.regions.southAmerica = new Region("southAmerica", 3,
        [[269, 197], [348, 229], [270, 363], [233, 231]], [[432, 110], [535, 179], [409, 238], [398, 347]]);

    globals.regions.northAmerica = new Region("northAmerica", 3, [[111, 107], [383, 76], [268, 195], [158, 197]],
    [[200, 132], [400, 350], [484, 273], [417, 286], [424, 207], [278, 239]]);

    globals.regions.asia = new Region("asia", 3, [[444,131], [457, 97], [712, 89], [703, 207], [523, 224]], 
    [[583, 134], [507, 305], [445, 373], [392, 297], [634, 258], [304, 355], [204, 181]]);

    globals.regions.oceania = new Region("oceania", 4, [[523, 229], [700, 212], [708, 312], [511, 307]], 
    [[567, 102], [360, 76], [613, 234], [390, 284]]);

    for(let region in globals.regions){
        let regionObj = globals.regions[region];
        //pour parcourir seulement les propriétés ajoutées à la classe Object
        if (!(regionObj instanceof Region)) {
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
    gameEls.stopTmpEls();

    globals.currentRegion = region.name;

    this.zoom = game.add.tween(gameEls.earthMap);

    let mp = region.poly.midPoint();

    let scale = region.scale;
    let zoomVector = region.zoomVector;

    this.zoom.to({
        x: game.world.centerX + zoomVector.x,
        y: game.world.centerY + zoomVector.y,
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
    gameEls.stopTmpEls(); //voir utils/gameEls.js

    globals.currentRegion = "";

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
