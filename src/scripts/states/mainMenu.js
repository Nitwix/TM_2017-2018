var mainMenuState = {
	earthMap: {},
	bureau: {}
};

mainMenuState.preload = function(){

};

mainMenuState.create = function(){
	this.bureau = game.add.image(0,0,"bureau");
	this.bureau.width = game.width;
	this.bureau.height = game.height;


	this.earthMap = game.add.image(0,0,"earthMap");
	this.earthMap.scale.setTo(1.4);
	centerImg(this.earthMap); //voir utils/img_pos.js
}