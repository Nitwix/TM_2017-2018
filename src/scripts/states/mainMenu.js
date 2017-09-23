var mainMenuState = {
	earthMap: {},
	bureau: {},
};

mainMenuState.preload = function(){

};

mainMenuState.create = function(){
	this.bureau = game.add.image(0,0,"bureau");
	this.bureau.width = game.width;
	this.bureau.height = game.height;


	this.earthMap = game.add.image(0,0,"earthMap");
	this.earthMap.scale.setTo(1.4);
	centerObj(this.earthMap); //voir utils/img_pos.js


	var fsButt = game.add.button(0,0,"buttons",function(){
		if(game.scale.isFullScreen){
			game.scale.stopFullScreen();
		}else{
			game.scale.startFullScreen();
		}
	},this,3,4,5,3);
	fsButt.scale.setTo(2);
	cornerObj(fsButt, 8, "se");


	var playButt = game.add.button(0,0,"buttons", function(){}, this, 0,1,2,1);
	playButt.scale.setTo(6,2);
	centerObj(playButt);
	
}