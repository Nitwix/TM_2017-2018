function centerObj(obj){
	obj.x = game.world.centerX;
	obj.y = game.world.centerY;
	obj.anchor.setTo(0.5);
}

function cornerObj(obj, offset, corner){
	var gw = game.width;
	var gh = game.height;

	var ow = obj.width;
	var oh = obj.height;
	//corner peut être nw, ne, sw, se
	//ex: nw = north west -> en haut à gauche
	//l'anchor est considérée être en haut à gauche
	switch(corner){
		case "nw":
			obj.x = offset;
			obj.y = offset;
			break;
		case "ne":
			obj.x = gw - ow - offset;
			obj.y = offset;
			break;
		case "sw":
			obj.x = offset;
			obj.y = gh - oh - offset;
			break;
		case "se":
			obj.x = gw - ow - offset;
			obj.y = gh - oh - offset;
			break;
		default:
			console.warn("Bad corner given in utils/pos.js (with cornerObj() )");
	}
}