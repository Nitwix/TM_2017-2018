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

