var preloadState = {
	earth: {}, //logo de la terre
	chargement : {} //text bmp de chargement
};

preloadState.preload = function(){

	//racourcis de chemins de fichiers
	var sprites = "assets/sprites/";

	// pour l'écran de chargement
	game.load.image("earthLogo",`${sprites}preload/earth.png`);
	game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

	//pour le menu principal
	game.load.image("earthMap",`${sprites}earthMap/earthMap.png`);
	game.load.image("bureau",`${sprites}bureau/bureau.png`);

	//pour l'UI
	game.load.spritesheet("buttons", `${sprites}/UI/buttons.png`, 32, 32);

};

preloadState.create = function(){
	this.earth = game.add.image(0,0,"earthLogo");
	this.earth.anchor.setTo(0.5);
	this.earth.scale.setTo(3);
	let margin = 20;
	this.earth.x = game.width - this.earth.width/2 - margin;
	this.earth.y = game.height - this.earth.height/2 - margin;

	this.chargement = game.add.bitmapText(0,0,"carrier_command","chargement...", 14); //x,y,font,text,size
	this.chargement.anchor.setTo(0.5);
	this.chargement.x = game.world.centerX;
	this.chargement.y = game.world.centerY;
};

preloadState.update = function(){
	this.earth.rotation += 0.01;

	if(game.load.hasLoaded){
		game.state.start("mainMenu");
	}
};