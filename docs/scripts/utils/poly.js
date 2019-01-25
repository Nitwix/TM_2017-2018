//fonction utilitaire pour transformer un array de points en Phaser.Polygon
function makePoly(points){
    let polyString = "[";
    for(let point of points){
        polyString += `new Phaser.Point(${point[0]},${point[1]}),`;
    }
    polyString = polyString.substr(0,polyString.length -1) + "]";
    let poly = new Phaser.Polygon(eval(polyString));
    return poly;
}

// prototype de Phaser.Polygon permettant de calculer le point central d'un polygone
Phaser.Polygon.prototype.midPoint = function(){
    let sx = 0, sy = 0;
    for(let point of this.points){
        sx += point.x;
        sy += point.y;
    }

    let mx = sx / this.points.length;
    let my = sy / this.points.length;

    return {x: mx, y: my};
}

