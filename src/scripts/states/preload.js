var preloadState = {
	earth: {}, //logo de la terre
	chargement : {} //text bmp de chargement
};

preloadState.preload = function(){
	game.load.image("earthLogo","assets/sprites/preload/earth.png");
	game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
};

preloadState.create = function(){
	this.earth = game.add.image(0,0,"earthLogo");
	this.earth.anchor.setTo(0.5);
	this.earth.scale.setTo(3);
	let margin = 20;
	this.earth.x = game.width - this.earth.width/2 - margin;
	this.earth.y = game.height - this.earth.height/2 - margin;

	this.chargement = game.add.bitmapText(0,0,"carrier_command","chargement...");
	this.chargement.anchor.setTo(0.5);
	this.chargement.x = game.world.centerX;
	this.chargement.y = game.world.centerY;
};

preloadState.update = function(){
	this.earth.rotation += 0.01;
};