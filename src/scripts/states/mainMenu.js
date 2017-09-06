var mainMenuState = {
	earthMap: {},
};

mainMenuState.preload = function(){

};

mainMenuState.create = function(){
	this.earthMap = game.add.image(0,0,"earthMap");
	this.earthMap.width = game.width;
	this.earthMap.height = game.height;
}