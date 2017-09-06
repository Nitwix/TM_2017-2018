var preloadState = {
	earth: {} //logo de la terre
};

preloadState.preload = function(){
	game.load.image("earthLogo","assets/sprites/preload/earth.png");
};

preloadState.create = function(){
	this.earth = game.add.image(0,0,"earthLogo");
	this.earth.anchor.setTo(0.5);
	this.earth.scale.setTo(3);
	let margin = 20;
	this.earth.x = game.width - this.earth.width/2 - margin;
	this.earth.y = game.height - this.earth.height/2 - margin;
};

preloadState.update = function(){
	this.earth.rotation += 0.01;
};