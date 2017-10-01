function setupBureau(){
    this.bureau = game.add.image(0,0,"bureau");
	this.bureau.width = game.width;
	this.bureau.height = game.height;


	this.earthMap = game.add.image(0,0,"earthMap");
	this.earthMap.scale.setTo(2**.5);
	centerObj(this.earthMap); //voir utils/img_pos.js
}

function setupUI(){
    var fsButt = game.add.button(0,0,"buttons",function(){
		if(game.scale.isFullScreen){
			game.scale.stopFullScreen();
		}else{
			game.scale.startFullScreen();
		}
	},this,3,4,5,3);
	fsButt.scale.setTo(2);
	cornerObj(fsButt, 4, "ne");
}